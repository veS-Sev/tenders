import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { tradingsApi } from '../features/tradings/api/tradings.api'
import activeParticipantReducer from "../features/participants/slices/participants.slice";
import  activeTradingReducer  from "../features/tradings/slices/tradings.slice";
export const store= configureStore({
    reducer:{
        activeParticipant:activeParticipantReducer,
        activeTrading:activeTradingReducer,
        [tradingsApi.reducerPath]: tradingsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tradingsApi.middleware)
})
setupListeners(store.dispatch)


// import { ThunkAction, Action } from '@reduxjs/toolkit';

// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
