import { IStockState } from "./types";
import { StockActions, StockActionTypes } from "./actions";
import _ from "lodash";

const initialState: IStockState = {
  codeNamePairs: [],
  allMovingAverageInfo: [
    {
      code: "005930",
      name: "샘플",
      five: 0,
      ten: 0,
      twenty: 0,
      thirty: 0,
      sixty: 0,
      onetwenty: 0,
      twoforty: 0
    }
  ],
  gapThreshold: Infinity
};

export default (state = initialState, action: StockActions) => {
  switch (action.type) {
    case StockActionTypes.UpdateCodeNamePairs:
      return { ...state, codeNamePairs: action.payload };
    case StockActionTypes.AddDailyTradeInfo:
      const infos = _.remove(
        state.allMovingAverageInfo.slice(),
        i => i.code === action.payload.code
      ).push(action.payload);

      return { ...state, allDailyTradeInfos: infos };
    case StockActionTypes.SetGapThreshold:
      return { ...state, gapThreshold: action.payload };
    default:
      return state;
  }
};
