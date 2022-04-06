import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import PropTypes from "prop-types";
import Gnome from "../Gnome";
import data from "../../data.json";
import { useTranslation } from "react-i18next";
import Modal from "react-native-modal";
import { Formik } from "formik";
import { FontAwesome5 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { homeStyles } from "../../utils/styles";
import { professions, hairColors } from "../../constants/gnomesData";
import CheckboxGroup from "../CheckboxGroup";

function Home({ allGnomes, addGnomes, navigation }) {
  const { t, i18n } = useTranslation("home");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalType, setModalType] = useState("");
  const [gnomesDisplayedLimit, setGnomesDisplayedLimit] = useState(0);
  const [gnomesDisplayed, setGnomesDisplayed] = useState([]);
  const [gnomes, setGnomes] = useState([]);
  const [initialFilters, setInitialFilters] = useState({
    minAge: "0",
    maxAge: "1000",
    professions: [],
    hairColor: [],
    friendsNumber: "",
  });
  const [checkboxesProfessions, setCheckboxesProfessions] = useState(
    professions
  );
  const [checkboxesHair, setCheckboxesHair] = useState(hairColors);

  useEffect(() => {
    setGnomesDisplayedLimit(10);
    if (allGnomes.length === 0) {
      addGnomes(data.Brastlewark);
    }
  }, []);

  useEffect(() => {
    if (gnomesDisplayed.length === 0) {
      setGnomes(allGnomes);
      setGnomesDisplayed(allGnomes.slice(0, 10));
    } else {
      setGnomesDisplayed(gnomes.slice(0, gnomesDisplayedLimit));
    }
  }, [allGnomes, gnomesDisplayedLimit, gnomes]);

  function toggleCheckbox(value, setFieldValue, arrayFilter, name) {
    console.log(value);
    let pushableFilter = arrayFilter;
    if (arrayFilter.includes(value)) {
      let index = pushableFilter.indexOf(value);
      pushableFilter.splice(index, 1);
    } else {
      pushableFilter.push(value);
    }
    setFieldValue(name, pushableFilter);
  }

  function filterGnomes(filtersObj) {
    setShowModal(false);
    setInitialFilters(filtersObj);
    let filterArray = allGnomes;
    if (filtersObj.professions.length > 0) {
      filtersObj.professions.forEach((profession) => {
        filterArray = filterArray.filter((gnome) =>
          gnome.professions.some(
            (gnomeProfession) => gnomeProfession === profession
          )
        );
      });
    }
    if (filtersObj.hairColor.length > 0) {
      filterArray = filterArray.filter((gnome) =>
        filtersObj.hairColor.includes(gnome.hair_color)
      );
    }
    if (filtersObj.friendsNumber != "") {
      filterArray = filterArray.filter((gnome) =>
        filtersObj.friendsNumber != "4"
          ? gnome.friends.length === parseInt(filtersObj.friendsNumber)
          : gnome.friends.length >= parseInt(filtersObj.friendsNumber)
      );
    }
    filterArray = filterArray.filter(
      (gnome) =>
        gnome.age >= filtersObj.minAge && gnome.age <= filtersObj.maxAge
    );
    setGnomes(filterArray);
  }

  function handleLoadMore() {
    setIsLoading(true);
    setTimeout(() => {
      let limit = gnomesDisplayedLimit;
      limit = limit + 10;
      setGnomesDisplayedLimit(limit);
      setIsLoading(false);
    }, 2000);
  }

  function CustomModal() {
    if (modalType === "language") {
      return (
        <Modal
          style={{ margin: 0 }}
          isVisible={showModal}
          onBackdropPress={() => setShowModal(false)}
        >
          <View style={homeStyles.modalContainer}>
            <View style={homeStyles.modalBg}>
              <TouchableOpacity
                style={homeStyles.modalLngButtons}
                onPress={() => {
                  i18n.changeLanguage("en");
                  setShowModal(false);
                }}
              >
                <Text style={{ fontSize: 18 }}>English</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={homeStyles.modalLngButtons}
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
        <Modal
          style={{ margin: 0 }}
          isVisible={showModal}
          onBackdropPress={() => setShowModal(false)}
        >
          <View style={homeStyles.modalContainer}>
            <View
              style={{
                backgroundColor: "white",
                paddingVertical: 20,
                paddingHorizontal: 10,
              }}
            >
              <Formik
                initialValues={initialFilters}
                onSubmit={(values) => filterGnomes(values)}
              >
                {({
                  setFieldValue,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                }) => (
                  <View>
                    <Text style={homeStyles.modalSubtitle}>
                      {t("Details-age")}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-around",
                      }}
                    >
                      <TextInput
                        onChangeText={handleChange("minAge")}
                        onBlur={handleBlur("minAge")}
                        value={values.minAge}
                        keyboardType="numeric"
                        placeholder="Min."
                        maxLength={4}
                        style={homeStyles.modalAgeInputs}
                      />
                      <TextInput
                        onChangeText={handleChange("maxAge")}
                        onBlur={handleBlur("maxAge")}
                        value={values.maxAge}
                        keyboardType="numeric"
                        placeholder="Max."
                        maxLength={4}
                        style={homeStyles.modalAgeInputs}
                      />
                    </View>
                    <CheckboxGroup
                      label={t("Details-professions")}
                      labelStyle={homeStyles.modalSubtitle}
                      contentContainerStyle={homeStyles.flatlistContainer}
                      flatlistViewContainer={homeStyles.flatlistViewContainer}
                      checkboxStyle={homeStyles.checkBox}
                      checkboxTextStyle={{
                        fontSize: 14,
                        flex: 1,
                        flexShrink: 1,
                      }}
                      data={checkboxesProfessions}
                      setFieldValue={setFieldValue}
                      toggleCheckbox={toggleCheckbox}
                      groupName="professions"
                      itemName="profession"
                      values={values}
                    />
                    <CheckboxGroup
                      label={t("Details-hair")}
                      labelStyle={homeStyles.modalSubtitle}
                      contentContainerStyle={homeStyles.flatlistContainer}
                      flatlistViewContainer={homeStyles.flatlistViewContainer}
                      checkboxStyle={homeStyles.checkBox}
                      checkboxTextStyle={homeStyles.colorPill}
                      data={checkboxesHair}
                      setFieldValue={setFieldValue}
                      toggleCheckbox={toggleCheckbox}
                      groupName="hairColor"
                      itemName="hair"
                      values={values}
                    />
                    <Text style={homeStyles.modalSubtitle}>
                      {t("Details-friends")}
                    </Text>
                    <View style={homeStyles.modalSelect}>
                      <Picker
                        selectedValue={values.friendsNumber}
                        onValueChange={(itemValue, itemIndex) =>
                          setFieldValue("friendsNumber", itemValue)
                        }
                        dropdownIconColor="#224de3"
                      >
                        <Picker.Item label={`${t("Unlimited")}`} value="" />
                        <Picker.Item label="0" value="0" />
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4 +" value="4" />
                      </Picker>
                    </View>

                    <TouchableOpacity onPress={handleSubmit}>
                      <Text style={homeStyles.submitButton}>
                        {t("Confirm")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </Modal>
      );
    }
  }

  function RenderFooter() {
    return isLoading ? (
      <View style={{ marginVertical: 10, alignItems: "center" }}>
        <ActivityIndicator size="large" color="#224de3" />
      </View>
    ) : null;
  }

  return (
    <View style={{ flex: 1 }}>
      {showModal && <CustomModal />}
      <View style={homeStyles.topButtonsContainer}>
        <TouchableOpacity
          style={homeStyles.topButtons}
          onPress={() => {
            setShowModal(true);
            setModalType("language");
          }}
        >
          <Text style={homeStyles.topButtonText}>{t("Change-lng")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={homeStyles.topButtons}
          onPress={() => {
            setShowModal(true);
            setModalType("filters");
          }}
        >
          <Text style={homeStyles.topButtonText}>{t("Filters")}</Text>
        </TouchableOpacity>
      </View>
      {gnomesDisplayed.length > 0 ? (
        <FlatList
          data={gnomesDisplayed.slice(0, gnomesDisplayedLimit)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(gnomeItem) => (
            <Gnome
              key={gnomeItem.item.id}
              gnome={gnomeItem.item}
              navigation={navigation}
            />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0}
          ListFooterComponent={RenderFooter}
        />
      ) : (
        <View></View>
      )}
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
