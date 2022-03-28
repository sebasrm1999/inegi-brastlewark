import React, { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import PropTypes from "prop-types";
import Gnome from "../Gnome";
import data from "../../data.json";

function Home({ allGnomes, addGnomes }) {
  useEffect(() => {
    if (allGnomes.length === 0) {
      addGnomes(data.Brastlewark);
    }
  }, []);

  return (
    <View>
      <Text>Home</Text>
      <ScrollView>
        {allGnomes.map((gnomeItem) => (
          <Gnome key={gnomeItem.id} gnome={gnomeItem} />
        ))}
      </ScrollView>
    </View>
  );
}

Home.propTypes = {
  allGnomes: PropTypes.array.isRequired,
  addGnomes: PropTypes.func.isRequired,
};

export default Home;
