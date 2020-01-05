import { ICodeNamePair } from "../../api";
import { IMovingAverageInfo } from "./types";

export enum StockActionTypes {
  UpdateCodeNamePairs = "UpdateCodeNamePairs",
  AddDailyTradeInfo = "AddDailyTradeInfo",
  SetGapThreshold = "SetGapThreshold"
}

export interface IUpdateCodeNamePairs {
  type: StockActionTypes.UpdateCodeNamePairs;
  payload: ICodeNamePair[];
}

export const updateCodeNamePairs = (pairs: ICodeNamePair[]) => {
  return {
    type: StockActionTypes.UpdateCodeNamePairs,
    payload: pairs
  };
};

export interface IAddDailyTradeInfo {
  type: StockActionTypes.AddDailyTradeInfo;
  payload: IMovingAverageInfo;
}

export const addDailyTradeInfo = (info: IMovingAverageInfo) => {
  return {
    type: StockActionTypes.AddDailyTradeInfo,
    payload: info
  };
};

export interface ISetGapThreshold {
  type: StockActionTypes.SetGapThreshold;
  payload: number;
}

export const setGapThreshold = (threshold: number) => {
  return {
    type: StockActionTypes.SetGapThreshold,
    payload: threshold
  };
};

export type StockActions =
  | IUpdateCodeNamePairs
  | IAddDailyTradeInfo
  | ISetGapThreshold;
