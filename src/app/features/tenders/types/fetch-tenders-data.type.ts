import {TTenderData} from './index'
export type TFetchTendersData = {
  tendersData:[]|TTenderData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null |undefined;
};
