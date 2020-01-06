import { call, put, select, takeLatest, takeEvery } from "redux-saga/effects";
import {
  getAllCompanyCodes,
  getDailyTradeHistory,
  IDailyTradeInfo
} from "../api";
import { calcMovingAverage } from "../util";
import { StockActionTypes } from "../store/stock/actions";
import { getCompanyCodes } from "./selectors";
import CompanyInfoCache from "../cache";

function* fetchAllCompanyCodes() {
  const allCompanyCodes = yield call(getAllCompanyCodes);
  yield put({
    type: StockActionTypes.UpdateCodeNamePairs,
    payload: allCompanyCodes
  });
}

function* clearCache() {
  const cache = CompanyInfoCache.getInstance();
  cache.cleanCache();
  yield call(cache.commit.bind(cache));
}

function* updateAllMovingAverages() {
  // Update KOSPI company names and codes
  if ((yield select(getCompanyCodes)).length === 0) {
    yield fetchAllCompanyCodes();
  }

  let companies = yield select(getCompanyCodes);
  let cache = CompanyInfoCache.getInstance();
  yield call(cache.init.bind(cache));
  yield put({
    type: StockActionTypes.BulkUpdateMAInfo,
    payload: cache.infos
  });

  // Do serially due to traffic
  for (let i = 0; i < companies.length; i++) {
    const company = companies[i];

    if (!cache.getCompanyInfo(company.code)) {
      const dailyInfo: IDailyTradeInfo[] = yield call(
        getDailyTradeHistory,
        company.code
      );

      cache.updateCompanyInfo(
        company.code,
        calcMovingAverage(company, dailyInfo)
      );

      yield call(cache.commit.bind(cache));

      if (cache.getCompanyInfo(company.code)) {
        yield put({
          type: StockActionTypes.AddMovingAverageInfo,
          payload: cache.getCompanyInfo(company.code)
        });
      }
    }
  }

  yield call(cache.cleanOldCache.bind(cache));
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
