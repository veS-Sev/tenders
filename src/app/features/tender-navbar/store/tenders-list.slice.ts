import { createSlice } from "@reduxjs/toolkit";
import {TTendersList} from '../type/tenders-list.type'

export type TActiveTenderReducer = {
  activeTender: string|undefined;
  tenderIdsList:[]| TTendersList[]
};
const initialState: TActiveTenderReducer = {
  activeTender: undefined,
  tenderIdsList:[],
};

export const activeTenderReducer = createSlice({
  name: "activeTender",
  initialState,
  reducers: {
    chooseCurrentVisibleTender(state, action) {
      state.activeTender = action.payload;
    },
    getTenderIdsList(state,action){
      state.tenderIdsList=action.payload;
    }
  }
});
export const { chooseCurrentVisibleTender, getTenderIdsList} = activeTenderReducer.actions;
export default activeTenderReducer.reducer;
