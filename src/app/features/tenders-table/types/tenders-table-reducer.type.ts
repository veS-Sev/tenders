import { TTenderData } from "../../tenders/types";
export type TTenderTableReducer={
    status: "idle" | "loading" | "succeeded" | "failed";
    error: null|string|undefined;
    tenderData:null|undefined|TTenderData;}