import { createSlice } from "@reduxjs/toolkit";
import {TTendersList} from '../type/tenders-list.type'

export type TActiveTenderReducer = {
  activeTender: string|null;
  error: null|string|undefined;
  tenderIdsList:[]| TTendersList[]
};
const initialState: TActiveTenderReducer = {
  activeTender: 'T-332259',
  tenderIdsList:[],
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
    getTenderIdsList(state,action){
      state.tenderIdsList=action.payload;
    }
  }
});
export const { chooseCurrentVisibleTender, getTenderIdsList} = activeTenderReducer.actions;
export default activeTenderReducer.reducer;
