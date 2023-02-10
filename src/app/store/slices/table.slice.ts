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
      console.log("state", state);
      console.log("action", action);
    },
  },
});
export const { changeParticipant } = activeParticipantReducer.actions;
export default activeParticipantReducer.reducer;
