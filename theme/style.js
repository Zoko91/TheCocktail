import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  container2: {
    width: width,
    height: 50,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    justifyContent: "center",
  },
  container3: {
    justifyContent: "center",
    height: 500,
  },
  container4: {
    height: 1000,
  },
  container5: {
    flex: 1,
    width: width,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(73,12,96,0.1)",
    marginBottom: 10,
  },
  container6: {
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 80,
    marginLeft: 5,
  },
  image2: {
    marginVertical: 20,
    width: 200,
    height: 200,
  },
  text: { fontSize: 18, paddingBottom: 10 },
  buttonContainer: {},
  text2: { fontSize: 15, marginLeft: 5 },
});

export default styles;

export const screenOptions = {
  headerStyle: {
    backgroundColor: "#bb1ef4",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};
