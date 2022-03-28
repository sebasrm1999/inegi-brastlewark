import React from "react";
import { connect } from "react-redux";
import Home from "./Home";
import { addGnomes } from "./state/homeActions";

function mapStateToProps(store) {
  return {
    allGnomes: store.get("gnomes"),
  };
}

const mapDispatchToProps = {
  addGnomes,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
