import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
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

function Home({ allGnomes, addGnomes, navigation }) {
  const { t, i18n } = useTranslation("home");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalType, setModalType] = useState("");
  const [gnomesDisplayedLimit, setGnomesDisplayedLimit] = useState(0);
  const [gnomesDisplayed, setGnomesDisplayed] = useState([]);
  const [initialFilters, setInitialFilters] = useState({
    minAge: "0",
    maxAge: "1000",
    professions: [],
    hairColor: [],
    friendsNumber: "",
  });
  const [checkboxesProfessions, setCheckboxesProfessions] = useState([
    {
      id: 1,
      profession: t("metalworker"),
    },
    {
      id: 2,
      profession: t("woodcarver"),
    },
    {
      id: 3,
      profession: t("stonecarver"),
    },
    {
      id: 4,
      profession: t("tinker"),
    },
    {
      id: 5,
      profession: t("tailor"),
    },
    {
      id: 6,
      profession: t("potter"),
    },
    {
      id: 7,
      profession: t("brewer"),
    },
    {
      id: 8,
      profession: t("medic"),
    },
    {
      id: 9,
      profession: t("prospector"),
    },
    {
      id: 10,
      profession: t("gemcutter"),
    },
    {
      id: 11,
      profession: t("mason"),
    },
    {
      id: 12,
      profession: t("cook"),
    },
    {
      id: 13,
      profession: t("baker"),
    },
    {
      id: 14,
      profession: t("miner"),
    },
    {
      id: 15,
      profession: t("carpenter"),
    },
    {
      id: 16,
      profession: t("farmer"),
    },
    {
      id: 17,
      profession: t("tax inspector"),
    },
    {
      id: 18,
      profession: t("smelter"),
    },
  ]);
  const [checkboxesHair, setCheckboxesHair] = useState([
    {
      id: 1,
      hair: t("pink"),
      color: "#ff45e0",
    },
    {
      id: 2,
      hair: t("red"),
      color: "#ff0000",
    },
    {
      id: 3,
      hair: t("green"),
      color: "#18cc00",
    },
    {
      id: 4,
      hair: t("gray"),
      color: "#6e706e",
    },
    {
      id: 5,
      hair: t("black"),
      color: "#000000",
    },
  ]);

  useEffect(() => {
    setGnomesDisplayedLimit(10);
    if (allGnomes.length === 0) {
      addGnomes(data.Brastlewark);
    }
  }, []);

  useEffect(() => {
    setGnomesDisplayed(allGnomes.slice(0, gnomesDisplayedLimit));
  }, [allGnomes, gnomesDisplayedLimit]);

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
    setGnomesDisplayed(filterArray);
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
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        marginBottom: 5,
                      }}
                    >
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
                        style={{
                          borderRadius: 15,
                          borderWidth: 1,
                          borderColor: "#224de3",
                          paddingVertical: 15,
                          paddingLeft: 5,
                          width: "40%",
                        }}
                      />
                      <TextInput
                        onChangeText={handleChange("maxAge")}
                        onBlur={handleBlur("maxAge")}
                        value={values.maxAge}
                        keyboardType="numeric"
                        placeholder="Max."
                        maxLength={4}
                        style={{
                          borderRadius: 15,
                          borderWidth: 1,
                          borderColor: "#224de3",
                          paddingVertical: 15,
                          paddingLeft: 5,
                          width: "40%",
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        margin: 5,
                      }}
                    >
                      {t("Details-professions")}
                    </Text>
                    <FlatList
                      contentContainerStyle={{
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      numColumns={3}
                      data={checkboxesProfessions}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={(profession) => (
                        <View
                          style={{
                            margin: 5,
                            flexDirection: "row",
                            width: 105,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() =>
                              toggleCheckbox(
                                profession.item.profession,
                                setFieldValue,
                                values.professions,
                                "professions"
                              )
                            }
                          >
                            <View
                              style={{
                                width: 20,
                                height: 20,
                                alignItems: "center",
                                borderColor: "#224de3",
                                borderWidth: 0.5,
                                borderRadius: 5,
                                marginRight: 2,
                                backgroundColor: `${
                                  values.professions.includes(
                                    profession.item.profession
                                  )
                                    ? "#224de3"
                                    : "#FFF"
                                }`,
                              }}
                            >
                              <FontAwesome5
                                name="check"
                                size={15}
                                color="#FFF"
                              />
                            </View>
                          </TouchableOpacity>
                          <Text
                            style={{ fontSize: 14, flex: 1, flexShrink: 1 }}
                          >
                            {t(`${profession.item.profession.toLowerCase()}`)}
                          </Text>
                        </View>
                      )}
                    />
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        margin: 5,
                      }}
                    >
                      {t("Details-hair")}
                    </Text>
                    <FlatList
                      contentContainerStyle={{
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      numColumns={3}
                      data={checkboxesHair}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={(hair) => (
                        <View
                          style={{
                            margin: 5,
                            flexDirection: "row",
                            width: 105,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() =>
                              toggleCheckbox(
                                hair.item.hair,
                                setFieldValue,
                                values.hairColor,
                                "hairColor"
                              )
                            }
                          >
                            <View
                              style={{
                                width: 20,
                                height: 20,
                                alignItems: "center",
                                borderColor: "#224de3",
                                borderWidth: 0.5,
                                borderRadius: 5,
                                marginRight: 15,
                                backgroundColor: `${
                                  values.hairColor.includes(hair.item.hair)
                                    ? "#224de3"
                                    : "#FFF"
                                }`,
                              }}
                            >
                              <FontAwesome5
                                name="check"
                                size={15}
                                color="#FFF"
                              />
                            </View>
                          </TouchableOpacity>
                          <Text
                            style={{
                              fontSize: 14,
                              flex: 1,
                              backgroundColor: hair.item.color,
                              fontWeight: "bold",
                              color: "#FFF",
                              textAlign: "center",
                              borderRadius: 10,
                              marginVertical: 2,
                            }}
                          >
                            {t(`${hair.item.hair.toLowerCase()}`)}
                          </Text>
                        </View>
                      )}
                    />
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        margin: 5,
                      }}
                    >
                      {t("Details-friends")}
                    </Text>
                    <View
                      style={{
                        borderColor: "#224de3",
                        borderWidth: 1,
                        borderRadius: 10,
                        marginVertical: 5,
                      }}
                    >
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
                      <Text
                        style={{
                          backgroundColor: "#224de3",
                          textAlign: "center",
                          color: "#FFF",
                          padding: 10,
                          borderRadius: 10,
                          marginVertical: 5,
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
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
