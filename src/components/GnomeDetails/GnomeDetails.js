import React, { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
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
    <View>
      <View
        style={{
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={{
            width: "100%",
            height: 200,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity>
            <View
              style={{
                width: 150,
                height: 150,
                borderRadius: 75,
                backgroundColor: "grey",
                borderColor: "#224de3",
                borderWidth: 1,
              }}
            >
              <Image
                source={gnomeImage}
                style={{ width: 150, height: 150, resizeMode: "cover" }}
              />
            </View>
          </TouchableOpacity>
        </ImageBackground>

        <Text style={{ fontSize: 26, fontWeight: "bold", marginTop: 10 }}>
          {gnome.name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
            marginVertical: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <FontAwesome5
              style={{ paddingRight: 10 }}
              name="baby"
              size={30}
              color="#224de3"
            />
            <View style={{ flexDirection: "column", alignItems: "center" }}>
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
            <View style={{ flexDirection: "column", alignItems: "center" }}>
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
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Text>{t("Details-weight")}</Text>
              <Text>{gnome.weight}</Text>
            </View>
          </View>
        </View>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 10 }}>
          {t("Details-professions")}
        </Text>
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
                    height: 40,
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
        <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 5 }}>
          {t("Details-friends")}
        </Text>
        <ScrollView style={{ height: 250 }}>
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
