import { ICodeNamePair, IDailyTradeInfo } from "./api";
import { IMovingAverageInfo } from "./store/stock/types";
import _ from "lodash";

const wasm = import("moving_average_calculator");

export const sanitizeCompanyCode = (code: string): string => {
  while (code.length !== 6) {
    code = "0" + code;
  }

  return code;
};

export const getCurrentDate = () => {
  const t = new Date();
  return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate();
};

export const calcMovingAverage = async (
  company: ICodeNamePair,
  dailyInfo: IDailyTradeInfo[]
): Promise<IMovingAverageInfo> => {
  const module = await wasm;
  const res = module.calculate_moving_average({
    trade_infos: dailyInfo
  });

  return {
    code: company.code,
    name: company.name,
    five: res.five,
    ten: res.ten,
    twenty: res.twenty,
    thirty: res.thirty,
    sixty: res.sixty,
    onetwenty: res.onetwenty,
    twoforty: res.twoforty
  };
};

export const findLargestGapPer = (info: IMovingAverageInfo): number => {
  let averages = [
    info.five,
    info.ten,
    info.twenty,
    info.thirty,
    info.sixty,
    info.onetwenty,
    info.twoforty
  ];

  return ((_.max(averages)! - _.min(averages)!) / _.min(averages)!) * 100;
};

export const isRecentlyTrending = (info: IMovingAverageInfo): boolean => {
  let averages = [
    info.five,
    info.ten,
    info.twenty,
    info.thirty,
    info.sixty,
    info.onetwenty,
    info.twoforty
  ];

  return _.max(averages) === info.five;
};
