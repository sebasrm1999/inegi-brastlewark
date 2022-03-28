import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";

function Gnome({ navigation, gnome }) {
  return (
    <View style={styles.box}>
      <Image />
      <Text>{gnome.name}</Text>
    </View>
  );
}

Gnome.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    popToTop: PropTypes.func.isRequired,
  }).isRequired,
  gnome: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  box: {
    margin: 10,
    backgroundColor: "#EDC9AF",
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Gnome;
