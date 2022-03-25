import React from "react";
import { connect } from "react-redux";
import Home from "./Home";

function mapStateToProps(state) {
  return {
    jugadores: state.jugadores,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
