import parser from "csv-parse";
import Cheerio from "cheerio";
import _ from "lodash";
import { sanitizeCompanyCode } from "./util";

export type CompanyCode = string;
export type CompanyName = string;

export interface IDailyTradeInfo {
  date: string;
  closingPrice: number;
  startingPrice: number;
  highest: number;
  lowest: number;
  volume: number;
}

export interface ICodeNamePair {
  code: CompanyCode;
  name: CompanyName;
}

export const getAllCompanyCodes = async (): Promise<ICodeNamePair[]> => {
  const res = await fetch("kospi_list.csv");
  const body = await res.text();

  return new Promise((res, rej) => {
    parser(body, (err: any, output: any) => {
      if (err) rej(err);
      res(
        output.map((o: any) => ({
          code: sanitizeCompanyCode(o[0]),
          name: o[1]
        }))
      );
    });
  });
};

export const getDailyTradeHistory = async (
  code: string
): Promise<IDailyTradeInfo[]> => {
  let result: IDailyTradeInfo[] = [];

  for (let i = 1; i <= 24; i++) {
    const res = await fetch(
      `https://finance.naver.com/item/sise_day.nhn?code=${code}&page=${i}`
    );
    const html = await res.text();
    const rows = Cheerio.load(html)("tr").filter(idx => {
      return (
        idx !== 0 &&
        idx !== 1 &&
        idx !== 7 &&
        idx !== 8 &&
        idx !== 9 &&
        idx !== 15 &&
        idx !== 16
      );
    });

    const data = _.map(rows, r => {
      const numbers = r.children
        .filter(c => c.type === "tag")
        .map((t, _) => {
          return t.children[0].children ? t.children[0].children[0].data : null;
        })
        .filter(d => d);

      if (numbers.length === 0)
        return {
          date: "",
          closingPrice: 0,
          startingPrice: 0,
          highest: 0,
          lowest: 0,
          volume: 0
        };

      return {
        date: numbers[0] as string,
        closingPrice: parseInt(numbers[1]!.replace(/,/g, ""), 10),
        startingPrice: parseInt(numbers[2]!.replace(/,/g, ""), 10),
        highest: parseInt(numbers[3]!.replace(/,/g, ""), 10),
        lowest: parseInt(numbers[4]!.replace(/,/g, ""), 10),
        volume: parseInt(numbers[5]!.replace(/,/g, ""), 10)
      };
    }).filter(d => d.date);

    result = result.concat(data);

    await new Promise(r => setTimeout(r, 5));
  }

  return result;
};
