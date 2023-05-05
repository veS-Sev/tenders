import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from '@reduxjs/toolkit/query'
// import { tradingsApi } from '../features/tradings/api/tradings.api'
import activeTimerParticipantSlice from "../features/participants/slices/participants.slice";
import  activeTradingReducer  from "../features/tradings/slices/tradings.slice";
import tradingsDataReducer from "../features/tradings/slices/tradings-data.slice"
export const store= configureStore({
    reducer:{
        activeTimerParticipant:activeTimerParticipantSlice,
        activeTrading:activeTradingReducer,
        tradingsData:tradingsDataReducer
        // [tradingsApi.reducerPath]: tradingsApi.reducer
    },
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(tradingsApi.middleware)
})
// setupListeners(store.dispatch)


// import { ThunkAction, Action } from '@reduxjs/toolkit';

// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
