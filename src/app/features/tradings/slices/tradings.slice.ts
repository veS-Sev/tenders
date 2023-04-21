import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../../api/client";

export const activeTradingReducer = createSlice({
  name: "activeTrading",
  initialState: {
    activeTrading: "T-456159",
    currentVisibleListOfPatricipants: null,
    status:'idle',
  },
  reducers: {
    chooseСurrentVisibleTrading(state, action) {
      state.activeTrading = action.payload;
    },
  },
});
export const { chooseСurrentVisibleTrading } = activeTradingReducer.actions;
export default activeTradingReducer.reducer;


export const fetchTradings = createAsyncThunk('tradings/fetchTradings', async () => {
  const response = await client.get('http://localhost:3001/tradings');
  console.log('response',response)
  return response.data
})
