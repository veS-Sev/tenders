import { createSlice } from "@reduxjs/toolkit";
import { currentActiveParticipant } from "../../functions/current-active-participant.funс";
import { useFetchService } from "../../pages/traiding-page/hooks/useFetchService.hook";
// const UseParticipantsList=()=>{
//   const 
// }

const activeParticipantReducer = createSlice({
  name: "activeParticipant",
  initialState: {
    activeParticipant: currentActiveParticipant(),
  },
  // В reducers перечисляется набор методов, который затем будем использовать
  reducers: {
    changeParticipant:(state,action) =>{
      console.log("changeParticipant - state", state)
      state.activeParticipant = currentActiveParticipant(action.payload);
    },
  },
});
export const { changeParticipant } = activeParticipantReducer.actions;
export default activeParticipantReducer.reducer;
