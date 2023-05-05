import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../../api/client";
import {TTradingData, TFetchTradingsData} from "../types"

export const fetchTradingsData = createAsyncThunk(
  "tradingsData/fetchTradingsData",
  async () => {
    const response = await client.get("http://localhost:3001/tradings");
    return response.data;
  }
);

const initialState:TFetchTradingsData={
    tradingsData:[],
    status: "idle",
    error: null, 
}

export const tradingsDataSlice = createSlice({
  name: "tradingsData",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(fetchTradingsData.pending, state => {
        state.status = 'loading'
      })
    .addCase(fetchTradingsData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tradingsData=action.payload
    })
    .addCase(fetchTradingsData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      });
  },
});
export default tradingsDataSlice.reducer;

export const selectTradingData = (state: any) => state.tradingsData.tradingsData;

export const selectTradingById = (state: any, tradingId:string) => state.tradingsData.tradingsData.find((trading:TTradingData)=>trading.tradingId===tradingId);

export const selectTradingLoadingStatus = (state: any):string => state.tradingsData.status;
