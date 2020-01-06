import { CompanyCode } from "./api";
import _ from "lodash";
import { get, set, clear } from "./storage";
import { getCurrentDate } from "./util";
import { IMovingAverageInfo } from "./store/stock/types";

export default class CompanyInfoCache {
  static _instance: CompanyInfoCache | null;

  infos: IMovingAverageInfo[];

  constructor() {
    this.infos = [];
  }

  async init() {
    const storedData = await get(getCurrentDate());
    this.infos = storedData ? storedData.data : [];
  }

  async commit() {
    return set(getCurrentDate(), {
      data: this.infos
    });
  }

  updateCompanyInfo(code: CompanyCode, info: IMovingAverageInfo) {
    const idx = _.findIndex(this.infos, c => c.code === code);
    if (idx !== -1) {
      this.infos[idx] = info;
    } else {
      this.infos.push(info);
    }
  }

  getCompanyInfo(code: CompanyCode) {
    return _.find(this.infos, c => c.code === code);
  }

  cleanCache() {
    this.infos = [];
  }

  async cleanOldCache() {
    await clear();
    await this.commit();
  }

  static getInstance() {
    if (!CompanyInfoCache._instance) {
      CompanyInfoCache._instance = new CompanyInfoCache();
    }

    return CompanyInfoCache._instance;
  }
}
