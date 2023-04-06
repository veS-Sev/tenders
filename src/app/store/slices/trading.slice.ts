import { createSlice } from "@reduxjs/toolkit";

export const activeTradingReducer = createSlice({
  name: "activeTrading",
  initialState: { activeTrading: 'T-456159' },
  reducers: {
    chooseVisibleTrading(state, action) {
      state.activeTrading = action.payload;
    }
  },
});
export const { chooseVisibleTrading } = activeTradingReducer.actions;
export default activeTradingReducer.reducer;
