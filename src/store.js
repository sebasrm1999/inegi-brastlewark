import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import gnomes from "./components/Home/state/homeReducer";

const rootReducer = combineReducers({
  gnomes,
});

export default createStore(gnomes, applyMiddleware(thunk));
