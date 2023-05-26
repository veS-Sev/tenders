import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../../api/client";

export const fetchTendersList = createAsyncThunk(
  "activeTender/fetchTendersList",
  async () => {
    const response = await client.get(
      "http://localhost:3001/tendersList"
    );
    console.log('response.data',response.data)
    return response.data;
  }
);

export type TActiveTenderReducer = {
  activeTender: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null|string|undefined;
  tenderIdsList:any
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
    chooseСurrentVisibleTender(state, action) {
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
export const { chooseСurrentVisibleTender } = activeTenderReducer.actions;
export default activeTenderReducer.reducer;
export const selectTenderIdsLoadingStatus = (state: any):string => state.activeTender.status;