import { configureStore } from "@reduxjs/toolkit";
import { tenderApi } from "../features/tender-table/api/tender.api";
import activeTimerParticipantSlice from "../features/tender-table/store/active-timer-participant.slice";
import activeTenderReducer from "../features/tender-navbar/store/tenders-list.slice";
export const store = configureStore({
  reducer: {
    activeTimerParticipant: activeTimerParticipantSlice,
    activeTender: activeTenderReducer,
    [tenderApi.reducerPath]: tenderApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(tenderApi.middleware)
});
// setupListeners(store.dispatch)

// import { ThunkAction, Action } from '@reduxjs/toolkit';

// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
