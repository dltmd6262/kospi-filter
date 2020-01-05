import { ICodeNamePair, IDailyTradeInfo } from "./api";
import { IMovingAverageInfo } from "./store/stock/types";
import _ from "lodash";

export const sanitizeCompanyCode = (code: string): string => {
  while (code.length !== 6) {
    code = "0" + code;
  }

  return code;
};

export const calcMovingAverage = (
  company: ICodeNamePair,
  dailyInfo: IDailyTradeInfo[]
): IMovingAverageInfo => {
  let result: IMovingAverageInfo = {
    code: company.code,
    name: company.name,
    five: 0,
    ten: 0,
    twenty: 0,
    thirty: 0,
    sixty: 0,
    onetwenty: 0,
    twoforty: 0
  };

  dailyInfo.reduce<number>((acc, cur, idx) => {
    acc = acc + cur.closingPrice;

    if (idx === 4) {
      result.five = Math.round(acc / 5);
    } else if (idx === 9) {
      result.ten = Math.round(acc / 10);
    } else if (idx === 19) {
      result.twenty = Math.round(acc / 20);
    } else if (idx === 29) {
      result.thirty = Math.round(acc / 30);
    } else if (idx === 59) {
      result.sixty = Math.round(acc / 60);
    } else if (idx === 119) {
      result.onetwenty = Math.round(acc / 120);
    } else if (idx === 239) {
      result.twoforty = Math.round(acc / 240);
    }

    return acc;
  }, 0);

  return result;
};

export const findLargestAverageGap = (info: IMovingAverageInfo): number => {
  let averages = [
    info.five,
    info.ten,
    info.twenty,
    info.thirty,
    info.sixty,
    info.onetwenty,
    info.twoforty
  ];

  return _.max(averages)! - _.min(averages)!;
};
