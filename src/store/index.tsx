import { combineReducers, createStore } from "redux";
import stock from "./stock/reducers";

export const rootReducer = combineReducers({
  stock
});

export const configureStore = () => {
  return createStore(rootReducer);
};
