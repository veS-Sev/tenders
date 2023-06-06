import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from '@reduxjs/toolkit/query'
// import { tendersApi } from '../features/tenders/api/tenders.api'
import activeTimerParticipantSlice from "../features/tender-table/store/active-timer-participant.slice";
import activeTenderReducer from "../features/tender-navbar/store/tenders-list.slice";
import tendersDataReducer from "./tenders-data.slice";
import tenderTableReducer from "../features/tender-table/store/fetch-tender-by-id.slice";
export const store = configureStore({
  reducer: {
    activeTimerParticipant: activeTimerParticipantSlice,
    activeTender: activeTenderReducer,
    tendersData: tendersDataReducer,
    tenderTable: tenderTableReducer,
    // [tendersApi.reducerPath]: tendersApi.reducer
  },
  // middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware().concat(tendersApi.middleware)
});
// setupListeners(store.dispatch)

// import { ThunkAction, Action } from '@reduxjs/toolkit';

// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
