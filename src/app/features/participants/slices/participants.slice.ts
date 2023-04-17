import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { currentActiveParticipant } from "../../../functions/current-active-participant.funс";

const participantReducer = createSlice({
  name: "participants",
  initialState: {
    participants: {
      status: "idle",
      data: [],
    },
    activeParticipant: currentActiveParticipant(),
  },
  // В reducers перечисляется набор методов, который затем будем использовать
  reducers: {
    changeParticipant: (state, action) => {
      state.activeParticipant = currentActiveParticipant(action.payload);
    },
  },
});
export const { changeParticipant } = participantReducer.actions;
export default participantReducer.reducer;

