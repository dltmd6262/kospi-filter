import { IStockState } from "./types";
import { StockActions, StockActionTypes } from "./actions";
import _ from "lodash";

const initialState: IStockState = {
  codeNamePairs: [],
  allMovingAverageInfo: [],
  gapThreshold: Infinity
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
    case StockActionTypes.SetGapThreshold:
      return { ...state, gapThreshold: action.payload };
    default:
      return state;
  }
};
