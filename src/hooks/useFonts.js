import * as Font from "expo-font";

export default useFonts = async () =>
  await Font.loadAsync({
    Lato: require("../../assets/fonts/Lato.ttf"),
  });
