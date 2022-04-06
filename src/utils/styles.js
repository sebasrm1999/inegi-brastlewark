import { StyleSheet } from "react-native";

export const gnomeStyles = StyleSheet.create({
  box: {
    margin: 10,
    backgroundColor: "#224de3",
    borderWidth: 1,
    borderColor: "#ff0000",
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 125,
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: "cover",
  },
});

export const detailsStyle = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    marginBottom: 40,
  },
  imageBg: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  img: { width: 150, height: 150 },
  imgContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "grey",
    borderColor: "#224de3",
    borderWidth: 1,
  },
  containerRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  containerColumn: { flexDirection: "column", alignItems: "center" },
  subtitle: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
});

export const homeStyles = StyleSheet.create({
  topButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginHorizontal: 25,
    paddingTop: 15,
  },
  topButtons: {
    borderColor: "#224de3",
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    paddingBottom: 8,
  },
  topButtonText: { fontSize: 18, color: "#224de3" },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 22,
  },
  modalBg: {
    backgroundColor: "white",
    paddingVertical: 20,
    alignItems: "center",
  },
  modalLngButtons: {
    width: "100%",
    marginVertical: 10,
    alignItems: "center",
  },
  modalSubtitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  modalAgeInputs: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#224de3",
    paddingVertical: 15,
    paddingLeft: 5,
    width: "40%",
  },
  flatlistContainer: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  flatlistViewContainer: {
    margin: 5,
    flexDirection: "row",
    width: 105,
  },
  colorPill: {
    fontSize: 14,
    flex: 1,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    borderRadius: 10,
    marginVertical: 2,
  },
  checkBox: {
    width: 20,
    height: 20,
    alignItems: "center",
    borderColor: "#224de3",
    borderWidth: 0.5,
    borderRadius: 5,
    marginRight: 2,
  },
  modalSelect: {
    borderColor: "#224de3",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 5,
  },
  submitButton: {
    backgroundColor: "#224de3",
    textAlign: "center",
    color: "#FFF",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
});
