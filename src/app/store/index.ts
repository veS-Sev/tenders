import { configureStore } from "@reduxjs/toolkit";
import activeParticipantReducer from "../features/participants/slices/participants.slice";
import  activeTradingReducer  from "../features/tradings/slices/tradings.slice";
export const store= configureStore({
    reducer:{
        activeParticipant:activeParticipantReducer,
        activeTrading:activeTradingReducer,
    }
})



// import { ThunkAction, Action } from '@reduxjs/toolkit';

// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
