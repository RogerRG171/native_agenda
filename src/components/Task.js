import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler/";

import moment from "moment";
import "moment/locale/pt-br";

import commonStyles from "../commonStyles";

const Task = ({ desc, estimateAt, doneAt, toggleTask, id, onDelete }) => {
  const doneOrNotStyle =
    doneAt != null ? { textDecorationLine: "line-through" } : {};

  const date = doneAt ? doneAt : estimateAt;
  const formattedDate = moment(date).locale("pt-br").format("ddd, D [de] MMMM");

  //functions

  const getRightContent = () => {
    return (
      <TouchableOpacity
        style={styles.right}
        onPress={() => onDelete(id)}
      >
        <Icon
          name="trash"
          size={30}
          color="#fff"
        />
      </TouchableOpacity>
    );
  };
  const getLeftContent = () => {
    return (
      <View style={styles.left}>
        <Icon
          name="trash"
          size={20}
          color="#fff"
          style={styles.excludeIcon}
        />
        <Text style={styles.excludeText}>Excluir</Text>
      </View>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={getRightContent}
        renderLeftActions={getLeftContent}
        onSwipeableLeftOpen={() => onDelete(id)}
      >
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => toggleTask(id)}>
            <View style={styles.checkContainer}>{getCheckView(doneAt)}</View>
          </TouchableWithoutFeedback>
          <View>
            <Text style={[styles.desc, doneOrNotStyle]}>{desc}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const getCheckView = (doneAt) => {
  let style = "";
  let icon = false;

  if (doneAt != null) {
    style = styles.done;
    icon = true;
  } else {
    style = styles.pending;
  }
  return (
    <View style={style}>
      {icon && (
        <Icon
          name="check"
          size={18}
          color={commonStyles.colors.secondary}
        />
      )}
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderColor: "#aaa",
    borderBottomWidth: 1,
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  checkContainer: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  pending: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#555",
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 13,
    backgroundColor: "#4d7031",
    alignItems: "center",
    justifyContent: "center",
  },
  desc: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.mainText,
    fontSize: 15,
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.subText,
  },
  right: {
    backgroundColor: "#f00",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
  left: {
    flex: 1,
    backgroundColor: "#f00",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  excludeText: {
    color: "#fff",
    fontSize: 20,
    margin: 10,
  },
  excludeIcon: {
    marginLeft: 10,
  },
});
