import { configureStore } from "@reduxjs/toolkit";
import activeParticipantReducer from "./slices/table.slice";
import  activeTradingReducer  from "./slices/trading.slice";
export const store= configureStore({
    reducer:{
        activeParticipant:activeParticipantReducer,
        activeTrading:activeTradingReducer 
    }
})



// import { ThunkAction, Action } from '@reduxjs/toolkit';

// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
