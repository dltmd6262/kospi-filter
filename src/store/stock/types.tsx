import { ICodeNamePair, CompanyCode, CompanyName } from "../../api";

export interface IMovingAverageInfo {
  code: CompanyCode;
  name: CompanyName;
  five: number;
  ten: number;
  twenty: number;
  thirty: number;
  sixty: number;
  onetwenty: number;
  twoforty: number;
  key?: number;
}

export interface IStockState {
  codeNamePairs: ICodeNamePair[];
  allMovingAverageInfo: IMovingAverageInfo[];
  gapThreshold: number;
}
