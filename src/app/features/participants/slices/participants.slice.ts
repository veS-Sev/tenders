import { createSlice} from "@reduxjs/toolkit";

const activeTimerParticipantSlice = createSlice({
  name: "activeTimerParticipant",
  initialState: {
    id:null
  },
  // В reducers перечисляется набор методов, который затем будем использовать
  reducers: {
    changeActiveParticipant(state, action){
      state.id=action.payload
    },
  },
});
export const { changeActiveParticipant } = activeTimerParticipantSlice.actions;
export default activeTimerParticipantSlice.reducer;
