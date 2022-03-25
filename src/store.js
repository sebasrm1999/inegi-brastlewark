import { createStore } from "redux";

const initialState = {
  jugadores: [],
  titulares: [],
  suplentes: [],
};

function reducerTrainer(state = initialState, action) {
  return state;
}

export default createStore(reducerTrainer);
