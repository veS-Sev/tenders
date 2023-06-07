import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../api/client";
import {TTenderData, TFetchTendersData} from "../features/tenders/types"

export const fetchTendersData = createAsyncThunk(
  "tendersData/fetchTendersData",
  async () => {
    const response = await client.get("https://bv09pq-8080.csb.app/tenders");
    return response.data;
  }
);

const initialState:TFetchTendersData={
    tendersData:[],
    status: "idle",
    error: null, 
}

export const tendersDataSlice = createSlice({
  name: "tendersData",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(fetchTendersData.pending, state => {
        state.status = 'loading'
      })
    .addCase(fetchTendersData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tendersData=action.payload
    })
    .addCase(fetchTendersData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      });
  },
});
export default tendersDataSlice.reducer;

export const selectTenderData = (state: any) => state.tendersData.tendersData;

export const selectTenderById = (state: any, tenderId:string) => state.tendersData.tendersData.find((tender:TTenderData)=>tender.id===tenderId);

export const selectTenderLoadingStatus = (state: any):string => state.tendersData.status;
