import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { gnomeStyles } from "../../utils/styles";

function Gnome({ navigation, gnome }) {
  const { t } = useTranslation("gnomes");

  function toDetails() {
    navigation.navigate("GnomeDetails", { gnome: gnome });
  }

  return (
    <TouchableOpacity onPress={toDetails}>
      <View style={gnomeStyles.box}>
        <Image
          style={gnomeStyles.image}
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
          <Text style={{ color: "#FFF" }}>
            {gnome.age} {t("Age")}
          </Text>
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

export default Gnome;
