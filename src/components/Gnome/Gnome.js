import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

function Gnome({ navigation, gnome }) {
  function toDetails() {
    navigation.navigate("GnomeDetails", { gnome: gnome });
  }

  return (
    <TouchableOpacity onPress={toDetails}>
      <View style={styles.box}>
        <Image
          style={styles.image}
          source={{
            uri: gnome.thumbnail,
          }}
        />
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
            justifyContent: "space-around",
          }}
        >
          <Text style={{ color: "#FFF", fontSize: 20, fontWeight: "bold" }}>
            {gnome.name}
          </Text>
          <Text style={{ color: "#FFF" }}>{gnome.age} years old</Text>
        </View>
      </View>
    </TouchableOpacity>
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

export default Gnome;
