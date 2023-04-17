import { createSlice } from "@reduxjs/toolkit";

export const activeTradingReducer = createSlice({
  name: "activeTrading",
  initialState: { activeTrading: 'T-456159',
  currentVisibleListOfPatricipants:null },
  reducers: {
    chooseСurrentVisibleTrading(state, action) {
      state.activeTrading = action.payload;
    }
  },
});
export const { chooseСurrentVisibleTrading
} = activeTradingReducer.actions;
export default activeTradingReducer.reducer;
