import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    borderRadius: 12,

    marginBottom: 16,
    marginLeft: 20,
    marginRight: 5,
    overflow: "hidden",
    width: 300,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 20,
  },

  title: {
    fontSize: 20,

    marginTop: 15,
    marginLeft: 2,
  },
  description: {
    fontSize: 16,
    color: "#777",
  },
});
