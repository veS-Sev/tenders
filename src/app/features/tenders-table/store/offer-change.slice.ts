import { createSlice} from "@reduxjs/toolkit";

const offerChangeSlice = createSlice({
  name: "offerChange",
  initialState: {
    hasChanged:false,
    participantId:null,
    tenderId:null,
    timerActive:false,
    offerForm:null
  },
  reducers: {
    offerIsChanging(state, action){
      console.log('action.payload',action.payload)
      state.hasChanged=action.payload.hasChanged
      state.participantId=action.payload.participantId
      state.tenderId=action.payload.tenderId
      state.timerActive=action.payload.timerActive
      state.offerForm=action.payload.offerForm
    },
  },
});
export const { offerIsChanging } = offerChangeSlice.actions;
export default offerChangeSlice.reducer;
