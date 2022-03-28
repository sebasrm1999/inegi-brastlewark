import { fromJS, Map } from "immutable";

const initialState = Map({
  gnomes: [],
});

function gnomes(gnomesState = initialState, { type, data }) {
  console.log(type);
  switch (type) {
    case "GNOMES_SET":
      return gnomesState.set("gnomes", data.gnomes);
    default:
      return gnomesState;
  }
}

export default gnomes;
