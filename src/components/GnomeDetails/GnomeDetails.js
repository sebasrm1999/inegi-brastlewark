import React, { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import FastImage from "react-native-fast-image";
import { FontAwesome5 } from "@expo/vector-icons";
import data from "../../data.json";
import Gnome from "../Gnome";
import { detailsStyle } from "../../utils/styles";
import loaderGif from "../../../assets/loader.gif";

function GnomeDetails({ navigation, route }) {
  const [friendsWithPhoto, setFriendsWithPhoto] = useState([]);

  const { t } = useTranslation("gnomes");

  function getFriendsWithPhoto() {
    let gnomeNamesAsKeys = {};
    let friendsNewArray = [];
    data.Brastlewark.forEach((gnomeItem) => {
      gnomeNamesAsKeys[gnomeItem.name] = gnomeItem;
    });
    gnome.friends.forEach((friend) => {
      friendsNewArray.push(gnomeNamesAsKeys[friend]);
    });
    setFriendsWithPhoto(friendsNewArray);
  }

  const image = {
    uri: "https://cdn.mos.cms.futurecdn.net/znS8J9YfNMr5tSmkQxVNLU.jpg",
  };
  const gnome = route.params.gnome;
  const gnomeImage = { uri: gnome.thumbnail };

  useEffect(() => {
    getFriendsWithPhoto();
  }, [route.params.gnome]);
  return (
    <View style={{ flex: 1 }}>
      <View style={detailsStyle.container}>
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={detailsStyle.imageBg}
        >
          <TouchableOpacity>
            <View style={detailsStyle.imgContainer}>
              <Image
                source={gnomeImage}
                resizeMode="cover"
                style={detailsStyle.img}
              />
            </View>
          </TouchableOpacity>
        </ImageBackground>

        <Text style={{ fontSize: 26, fontWeight: "bold", marginTop: 10 }}>
          {gnome.name}
        </Text>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {t("Details-hair")}
          </Text>
          <Text>{t(`${gnome.hair_color.toLowerCase()}`)}</Text>
        </View>
        <View style={detailsStyle.containerRow}>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome5
              style={{ paddingRight: 10 }}
              name="baby"
              size={30}
              color="#224de3"
            />
            <View style={detailsStyle.containerColumn}>
              <Text>{t("Details-age")}</Text>
              <Text>{gnome.age}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome5
              style={{ paddingRight: 10 }}
              name="male"
              size={30}
              color="#224de3"
            />
            <View style={detailsStyle.containerColumn}>
              <Text>{t("Details-height")}</Text>
              <Text>{gnome.height}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome5
              style={{ paddingRight: 10 }}
              name="weight-hanging"
              size={30}
              color="#224de3"
            />
            <View style={detailsStyle.containerColumn}>
              <Text>{t("Details-weight")}</Text>
              <Text>{gnome.weight}</Text>
            </View>
          </View>
        </View>
        <Text style={detailsStyle.subtitle}>{t("Details-professions")}</Text>
        <View style={{ width: "90%", marginHorizontal: 20 }}>
          {gnome.professions.length > 0 ? (
            <FlatList
              contentContainerStyle={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
              numColumns={3}
              data={gnome.professions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={(profession) => (
                <View
                  style={{
                    margin: 5,
                    flexDirection: "row",
                    width: 105,
                  }}
                >
                  <FontAwesome5
                    style={{ paddingRight: 5, paddingTop: 6 }}
                    name="asterisk"
                    size={10}
                    color="#224de3"
                  />
                  <Text style={{ fontSize: 16, flex: 1, flexShrink: 1 }}>
                    {t(`${profession.item.toLowerCase()}`)}
                  </Text>
                </View>
              )}
            />
          ) : (
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Text style={{ fontSize: 16 }}>{t("No-professions")}</Text>
            </View>
          )}
        </View>
        <Text style={detailsStyle.subtitle}>{t("Details-friends")}</Text>
        <ScrollView style={{ height: 180 }}>
          {friendsWithPhoto.length > 0 ? (
            friendsWithPhoto.map((friend) => (
              <Gnome key={friend.id} gnome={friend} navigation={navigation} />
            ))
          ) : (
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Text style={{ fontSize: 16 }}>{t("No-friends")}</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

GnomeDetails.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    popToTop: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.object.isRequired,
};

export default GnomeDetails;
