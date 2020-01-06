import { ICodeNamePair } from "../../api";
import { IMovingAverageInfo } from "./types";

export enum StockActionTypes {
  UpdateCodeNamePairs = "UpdateCodeNamePairs",
  AddMovingAverageInfo = "AddMovingAverageInfo",
  SetGapThreshold = "SetGapThreshold",
  UpdateAllMovingAverages = "UpdateAllMovingAverages",
  SetRecentlyTrending = "SetRecentlyTrending",
  ClearCache = "ClearCache"
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
  type: StockActionTypes.AddMovingAverageInfo;
  payload: IMovingAverageInfo;
}

export const addMovingAverageInfo = (info: IMovingAverageInfo) => {
  return {
    type: StockActionTypes.AddMovingAverageInfo,
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

export interface IUpdateAllMovingAverages {
  type: StockActionTypes.UpdateAllMovingAverages;
}

export const updateAllMovingAverages = () => {
  return {
    type: StockActionTypes.UpdateAllMovingAverages
  };
};

export interface ISetRecentlyTrending {
  type: StockActionTypes.SetRecentlyTrending;
  payload: boolean;
}

export const setRecentlyTrending = (value: boolean) => {
  return {
    type: StockActionTypes.UpdateAllMovingAverages,
    payload: value
  };
};

export interface IClearCache {
  type: StockActionTypes.ClearCache;
}

export type StockActions =
  | IUpdateCodeNamePairs
  | IAddDailyTradeInfo
  | ISetGapThreshold
  | IUpdateAllMovingAverages
  | ISetRecentlyTrending
  | IClearCache;
