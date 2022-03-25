import React from "react";
import { ScrollView, Text, View } from "react-native";
import PropTypes from "prop-types";

function Home({ navigation, jugadores }) {
  return (
    <View>
      <Text>Home</Text>
      <ScrollView>
        {jugadores.map((jugador) => {
          <View key={jugador.id}>
            <Text>{jugador.name}</Text>
          </View>;
        })}
      </ScrollView>
    </View>
  );
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    popToTop: PropTypes.func.isRequired,
  }).isRequired,
  jugadores: PropTypes.array.isRequired,
};

export default Home;
