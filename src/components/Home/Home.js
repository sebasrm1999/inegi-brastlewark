import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Gnome from "../Gnome";
import data from "../../data.json";
import { useTranslation } from "react-i18next";
import Modal from "react-native-modal";

function Home({ allGnomes, addGnomes, navigation }) {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const { t, i18n } = useTranslation("home");
  useEffect(() => {
    if (allGnomes.length === 0) {
      addGnomes(data.Brastlewark);
    }
  }, []);

  function CustomModal() {
    if (modalType === "language") {
      return (
        <Modal
          style={{ margin: 0 }}
          isVisible={showModal}
          onBackdropPress={() => setShowModal(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              marginTop: 22,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                paddingVertical: 20,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  width: "100%",
                  marginVertical: 10,
                  alignItems: "center",
                }}
                onPress={() => {
                  i18n.changeLanguage("en");
                  setShowModal(false);
                }}
              >
                <Text style={{ fontSize: 18 }}>English</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "100%",
                  marginVertical: 10,
                  alignItems: "center",
                }}
                onPress={() => {
                  i18n.changeLanguage("es-MX");
                  setShowModal(false);
                }}
              >
                <Text style={{ fontSize: 18 }}>Español latinoamérica</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      );
    } else if (modalType === "filters") {
      return (
        <Modal isVisible={showModal}>
          <View>
            <Text>Modal 2</Text>
          </View>
        </Modal>
      );
    }
  }

  return (
    <View>
      {showModal && <CustomModal />}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          marginHorizontal: 25,
          paddingTop: 15,
        }}
      >
        <TouchableOpacity
          style={{
            borderColor: "#224de3",
            borderWidth: 1,
            borderRadius: 15,
            padding: 5,
            paddingBottom: 8,
          }}
          onPress={() => {
            setShowModal(true);
            setModalType("language");
          }}
        >
          <Text style={{ fontSize: 18, color: "#224de3" }}>
            {t("Change-lng")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderColor: "#224de3",
            borderWidth: 1,
            borderRadius: 15,
            padding: 5,
            paddingBottom: 8,
          }}
          onPress={() => {
            setShowModal(true);
            setModalType("filters");
          }}
        >
          <Text style={{ fontSize: 18, color: "#224de3" }}>{t("Filters")}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {allGnomes.slice(0, 10).map((gnomeItem) => (
          <Gnome key={gnomeItem.id} gnome={gnomeItem} navigation={navigation} />
        ))}
      </ScrollView>
    </View>
  );
}

Home.propTypes = {
  allGnomes: PropTypes.array.isRequired,
  addGnomes: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    popToTop: PropTypes.func.isRequired,
  }).isRequired,
};

export default Home;
