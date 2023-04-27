import {TTradingData} from './index'
export type TFetchTradingsData = {
  tradingsData:[]|TTradingData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null |undefined;
};
