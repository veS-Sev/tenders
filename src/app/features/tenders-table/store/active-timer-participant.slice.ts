import { createSlice} from "@reduxjs/toolkit";

const activeTimerParticipantSlice = createSlice({
  name: "activeTimerParticipant",
  initialState: {
    id:null
  },
  reducers: {
    changeActiveParticipant(state, action){
      console.log('action.payload',action.payload)
      state.id=action.payload
    },
  },
});
export const { changeActiveParticipant } = activeTimerParticipantSlice.actions;
export default activeTimerParticipantSlice.reducer;
