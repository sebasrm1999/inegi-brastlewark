import React from "react";
import PropTypes from "prop-types";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

function CheckboxGroup({
  label,
  labelStyle,
  contentContainerStyle,
  flatlistViewContainer,
  checkboxStyle,
  checkboxTextStyle,
  data,
  toggleCheckbox,
  setFieldValue,
  groupName,
  itemName,
  values,
}) {
  const { t } = useTranslation("home");
  return (
    <>
      <Text style={labelStyle}>{label}</Text>
      <FlatList
        contentContainerStyle={contentContainerStyle}
        numColumns={3}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(dataItem) => (
          <View style={flatlistViewContainer}>
            <TouchableOpacity
              onPress={() =>
                toggleCheckbox(
                  dataItem.item[itemName],
                  setFieldValue,
                  values[groupName],
                  groupName
                )
              }
            >
              <View
                style={[
                  checkboxStyle,
                  {
                    backgroundColor: `${
                      values[groupName].includes(dataItem.item[itemName])
                        ? "#224de3"
                        : "#FFF"
                    }`,
                  },
                ]}
              >
                <FontAwesome5 name="check" size={15} color="#FFF" />
              </View>
            </TouchableOpacity>
            <Text
              style={
                dataItem.item.color
                  ? [
                      checkboxTextStyle,
                      { backgroundColor: dataItem.item.color },
                    ]
                  : checkboxTextStyle
              }
            >
              {t(`${dataItem.item[itemName].toLowerCase()}`)}
            </Text>
          </View>
        )}
      />
    </>
  );
}

CheckboxGroup.propTypes = {
  label: PropTypes.string.isRequired,
  labelStyle: PropTypes.object.isRequired,
  contentContainerStyle: PropTypes.object.isRequired,
  flatlistViewContainer: PropTypes.object.isRequired,
  checkboxStyle: PropTypes.object.isRequired,
  checkboxTextStyle: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  toggleCheckbox: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  groupName: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
};

export default CheckboxGroup;
