import { combineReducers, createStore, applyMiddleware } from "redux";
import stock from "./stock/reducers";
import createSagaMiddleware from "redux-saga";
import RootSaga from "../sagas";

export const rootReducer = combineReducers({
  stock
});

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(RootSaga);

  return store;
};
