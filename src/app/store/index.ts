import { configureStore } from "@reduxjs/toolkit";
import activeParticipantReducer from "./slices/table.slice";
export const store= configureStore({
    reducer:{
        activeParticipant:activeParticipantReducer
    }
})



// import { ThunkAction, Action } from '@reduxjs/toolkit';

// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
