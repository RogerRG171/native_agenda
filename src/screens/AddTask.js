import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import moment from "moment";
import React, { useState } from "react";
import commonStyles from "../commonStyles";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddTask = ({ onCancel, onSave, isVisible }) => {
  //states
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  //functions

  const getDatePicker = () => {
    let datePicker = (
      <DateTimePicker
        value={date}
        onChange={(_, date) => {
          setDate(date), setShowDatePicker(false);
        }}
        mode="date"
      />
    );

    const dateString = moment(date).format("dddd, D [de] MMMM [de] YYYY");

    if (Platform.OS === "android") {
      datePicker = (
        <View>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.date}>{dateString}</Text>
          </TouchableOpacity>
          {showDatePicker && datePicker}
        </View>
      );
    }

    return datePicker;
  };

  const save = () => {
    const newTask = { desc, date };

    onSave && onSave(newTask);
    setDate(new Date());
    setDesc("");
  };

  return (
    <Modal
      transparent
      visible={isVisible}
      onRequestClose={onCancel}
      animationType="slide"
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}></View>
      </TouchableWithoutFeedback>
      <View style={styles.container}>
        <Text style={styles.header}>Nova Tarefa</Text>
        <TextInput
          style={styles.input}
          placeholder="Informe a Descrição..."
          value={desc}
          onChangeText={setDesc}
        />
        {getDatePicker()}
        <View style={styles.buttons}>
          <TouchableOpacity onPress={onCancel}>
            <Text style={styles.button}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={save}>
            <Text style={styles.button}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}></View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  container: {
    backgroundColor: "#fff",
  },
  header: {
    fontFamily: commonStyles.fontFamily,
    backgroundColor: commonStyles.colors.today,
    color: commonStyles.colors.secondary,
    textAlign: "center",
    padding: 15,
    fontSize: 18,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    marginVertical: 20,
    marginRight: 30,
    color: commonStyles.colors.today,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderColor: "#ccc",
  },
  input: {
    fontFamily: commonStyles.fontFamily,
    height: 40,
    margin: 15,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: 6,
    paddingHorizontal: 6,
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 18,
    marginHorizontal: 15,
    color: "#555",
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: 6,
    padding: 4,
  },
});
