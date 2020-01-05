import { AppState } from "../store/types";

export const getCompanyCodes = (state: AppState) => state.stock.codeNamePairs;
