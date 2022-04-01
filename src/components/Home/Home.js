import React, { useEffect } from "react";
import { ScrollView, Text, View, Image } from "react-native";
import PropTypes from "prop-types";
import Gnome from "../Gnome";
import data from "../../data.json";

function Home({ allGnomes, addGnomes, navigation }) {
  useEffect(() => {
    if (allGnomes.length === 0) {
      addGnomes(data.Brastlewark);
    }
  }, []);

  return (
    <View>
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
