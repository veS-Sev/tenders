import { createSlice } from "@reduxjs/toolkit";
import { currentActiveParticipant } from "../../functions/current-active-participant.funс";
const activeParticipantReducer = createSlice({
  name: "activeParticipant",
  initialState: {
    activeParticipant: currentActiveParticipant(),
  },
  // В reducers перечисляется набор методов, который затем будем использовать
  reducers: {
    changeParticipant(state, action) {
      state.activeParticipant=currentActiveParticipant();
      console.log('state.activeParticipant',state.activeParticipant)
    },
  },
});
export const { changeParticipant } = activeParticipantReducer.actions;
export default activeParticipantReducer.reducer;
