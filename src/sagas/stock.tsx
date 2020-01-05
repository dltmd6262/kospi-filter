import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  getAllCompanyCodes,
  getDailyTradeHistory,
  IDailyTradeInfo
} from "../api";
import { calcMovingAverage } from "../util";
import { StockActionTypes } from "../store/stock/actions";
import { getCompanyCodes } from "./selectors";

function* fetchAllCompanyCodes() {
  const allCompanyCodes = yield call(getAllCompanyCodes);
  yield put({
    type: StockActionTypes.UpdateCodeNamePairs,
    payload: allCompanyCodes
  });
}

function* updateAllMovingAverages() {
  if ((yield select(getCompanyCodes)).length === 0) {
    yield fetchAllCompanyCodes();
  }

  let companies = yield select(getCompanyCodes);

  // Do serially due to traffic
  for (let i = 0; i < companies.length; i++) {
    const company = companies[i];
    const dailyInfo: IDailyTradeInfo[] = yield call(
      getDailyTradeHistory,
      company.code
    );

    const averages = calcMovingAverage(company, dailyInfo);
    yield put({
      type: StockActionTypes.AddMovingAverageInfo,
      payload: averages
    });
  }
}

export function* watchUpdateAllMovingAverages() {
  yield takeLatest(
    StockActionTypes.UpdateAllMovingAverages,
    updateAllMovingAverages
  );
}
