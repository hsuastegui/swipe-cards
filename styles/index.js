import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "cover",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "grey",
  },
  feedback: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
