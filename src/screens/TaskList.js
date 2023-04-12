import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

//assets
import todayImage from "../../assets/imgs/today.jpg";
import commonStyles from "../commonStyles";

//icons
import Icon from "react-native-vector-icons/FontAwesome";

//date
import moment from "moment";
import "moment/locale/pt-br";

//components
import Task from "../components/Task";
import AddTask from "./AddTask";

const TaskList = () => {
  //states
  const [showDoneTask, setShowDoneTask] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);
  const [visibleTasks, setVisibleTasks] = useState([]);
  const [tasks, setTasks] = useState([]);

  const initialState = () => {
    setShowAddTask(true);
    setShowAddTask(false);
    setVisibleTasks([]);
    setTasks([]);
  };

  //date
  const today = moment().locale("pt-br").format("ddd, D [de] MMMM");

  //functions

  const toggleTask = (id) => {
    const list = [...tasks];
    list.forEach((task) => {
      if (task.id === id) {
        task.doneAt = task.doneAt ? null : new Date();
      }
    });

    setTasks(list);
  };

  const toggleFilter = () => {
    setShowDoneTask(!showDoneTask);
  };

  const filterTasks = () => {
    let list = null;
    if (showDoneTask) {
      list = [...tasks];
    } else {
      const pending = (task) => task.doneAt === null;
      list = tasks.filter(pending);
    }

    setVisibleTasks(list);
    storeData({ showDoneTask, showAddTask, visibleTasks, tasks });
  };

  const addTask = (newTask) => {
    if (!newTask?.desc || !newTask?.desc.trim()) {
      Alert.alert("Erro", "Digite uma descrição válida...");
      return;
    }

    const list = [...tasks];
    list.push({
      id: Math.floor(Math.random() * 1000),
      desc: newTask.desc,
      estimateAt: newTask.date,
      doneAt: null,
    });

    setTasks(list);
    setShowAddTask(false);
  };

  const deleteTask = (id) => {
    const list = [...tasks];
    setTasks(list.filter((t) => t.id !== id));
  };

  //hooks
  useEffect(() => {
    const data = getData();

    data.then((d) => {
      setShowAddTask(d.showAddTask),
        setShowDoneTask(d.showDoneTask),
        setVisibleTasks(d.visibleTasks),
        setTasks(d.tasks);
    });
  }, []);

  useEffect(() => {
    filterTasks();
  }, [showDoneTask, tasks]);

  return (
    <View style={styles.container}>
      <AddTask
        isVisible={showAddTask}
        onCancel={() => setShowAddTask(false)}
        onSave={addTask}
      />
      <ImageBackground
        style={styles.background}
        source={todayImage}
      >
        <View style={styles.iconBar}>
          <TouchableOpacity onPress={toggleFilter}>
            <Icon
              name={showDoneTask ? "eye" : "eye-slash"}
              size={20}
              color={commonStyles.colors.secondary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Hoje</Text>
          <Text style={styles.subtitle}>{today}</Text>
        </View>
      </ImageBackground>
      <View style={styles.taskList}>
        <FlatList
          data={visibleTasks}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <Task
              {...item}
              toggleTask={toggleTask}
              onDelete={deleteTask}
            />
          )}
        />
      </View>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setShowAddTask(true)}
        activeOpacity={0.7}
      >
        <Icon
          name="plus"
          size={20}
          color={commonStyles.colors.secondary}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3,
  },
  taskList: {
    flex: 7,
  },
  titleBar: {
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30,
  },
  iconBar: {
    flexDirection: "row",
    marginHorizontal: 20,
    justifyContent: "flex-end",
    marginTop: Platform.OS === "ios" ? 30 : 10,
  },
  addBtn: {
    position: "absolute",
    right: 30,
    bottom: 30,
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: commonStyles.colors.today,
    justifyContent: "center",
    alignItems: "center",
  },
});

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("tasks");
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.warn(e);
  }
};

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);

    await AsyncStorage.setItem("tasks", jsonValue);
  } catch (e) {
    console.warn(e);
    console.warn(jsonValue);
  }
};
