import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../../api/client";
import {TTendersList} from '../type/tenders-list.type'

export const fetchTendersList = createAsyncThunk(
  "activeTender/fetchTendersList",
  async () => {
    const response = await client.get(
      "https://bv09pq-8080.csb.app/tendersList"
    );
    return response.data;
  }
);


export type TActiveTenderReducer = {
  activeTender: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null|string|undefined;
  tenderIdsList:[]| TTendersList[]
};
const initialState: TActiveTenderReducer = {
  activeTender: "T-456159",
  tenderIdsList:[],
  status: "idle",
  error: null,
};

export const activeTenderReducer = createSlice({
  name: "activeTender",
  initialState,
  reducers: {
    chooseCurrentVisibleTender(state, action) {
      console.log('state.activeTender',state.activeTender)
      state.activeTender = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTendersList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTendersList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tenderIdsList = action.payload;
      })
      .addCase(fetchTendersList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message
      });
  },
});
export const { chooseCurrentVisibleTender } = activeTenderReducer.actions;
export default activeTenderReducer.reducer;
export const selectTenderIdsLoadingStatus = (state: any):string => state.activeTender.status;