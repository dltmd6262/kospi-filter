import { call, put, select, takeLatest, takeEvery } from "redux-saga/effects";
import {
  getAllCompanyCodes,
  getDailyTradeHistory,
  IDailyTradeInfo
} from "../api";
import { calcMovingAverage, getCurrentDate } from "../util";
import { StockActionTypes } from "../store/stock/actions";
import { getCompanyCodes } from "./selectors";
import { has, get, set, clear } from "../storage";

function* fetchAllCompanyCodes() {
  const allCompanyCodes = yield call(getAllCompanyCodes);
  yield put({
    type: StockActionTypes.UpdateCodeNamePairs,
    payload: allCompanyCodes
  });
}

function* clearCache() {
  yield call(clear);
  yield call(updateAllMovingAverages);
}

function* updateAllMovingAverages() {
  // Update KOSPI company names and codes
  if ((yield select(getCompanyCodes)).length === 0) {
    yield fetchAllCompanyCodes();
  }

  let companies = yield select(getCompanyCodes);

  if (yield call(has, getCurrentDate())) {
    const allAverages = yield call(get, getCurrentDate());
    for (let i = 0; i < allAverages.data.length; i++) {
      yield put({
        type: StockActionTypes.AddMovingAverageInfo,
        payload: allAverages.data[i]
      });
    }
  } else {
    // Clear previous cache of moving averages
    yield call(clear);

    const allAverages = [];

    // Do serially due to traffic
    for (let i = 0; i < companies.length; i++) {
      const company = companies[i];
      const dailyInfo: IDailyTradeInfo[] = yield call(
        getDailyTradeHistory,
        company.code
      );

      const averages = calcMovingAverage(company, dailyInfo);
      allAverages.push(averages);

      yield put({
        type: StockActionTypes.AddMovingAverageInfo,
        payload: averages
      });
    }

    yield call(set, getCurrentDate(), { data: allAverages });
  }
}

export function* watchUpdateAllMovingAverages() {
  yield takeLatest(
    StockActionTypes.UpdateAllMovingAverages,
    updateAllMovingAverages
  );
}

export function* watchClearCache() {
  yield takeEvery(StockActionTypes.ClearCache, clearCache);
}
