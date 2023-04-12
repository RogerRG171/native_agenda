import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { StyleSheet, Text, View } from "react-native";
import TaskList from "./src/screens/TaskList";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native";

export default function App() {
  const [loaded] = useFonts({
    Lato: require("./src/assets/fonts/Lato.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <TaskList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: StatusBar.currentHeight,
  },
});
