import { IStockState } from "./types";
import { StockActions, StockActionTypes } from "./actions";
import _ from "lodash";

const initialState: IStockState = {
  codeNamePairs: [],
  allMovingAverageInfo: [],
  gapThreshold: Infinity,
  recentlyTrending: true
};

export default (state = initialState, action: StockActions) => {
  switch (action.type) {
    case StockActionTypes.UpdateCodeNamePairs:
      return { ...state, codeNamePairs: action.payload };
    case StockActionTypes.AddMovingAverageInfo:
      const infos = _.remove(
        [...state.allMovingAverageInfo],
        i => i.code !== action.payload.code
      );

      infos.push(action.payload);

      return { ...state, allMovingAverageInfo: infos };
    case StockActionTypes.BulkUpdateMAInfo:
      return { ...state, allMovingAverageInfo: action.payload };
    case StockActionTypes.SetGapThreshold:
      return { ...state, gapThreshold: action.payload };
    case StockActionTypes.SetRecentlyTrending:
      return { ...state, recentlyTrending: action.payload };
    case StockActionTypes.ClearCache:
      return { ...state, allMovingAverageInfo: [] };
    default:
      return state;
  }
};
