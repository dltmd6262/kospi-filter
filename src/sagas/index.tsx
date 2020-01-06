import { all } from "redux-saga/effects";
import { watchUpdateAllMovingAverages, watchClearCache } from "./stock";

export default function* rootSaga() {
  yield all([watchUpdateAllMovingAverages(), watchClearCache()]);
}
