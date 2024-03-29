import { configureStore } from "@reduxjs/toolkit";
import { tenderApi } from "../features/tenders-table/api/tender.api";
import { tendersListApi } from "../features/tender-navbar/api/tenders-list.api";
import activeTimerParticipantSlice from "../features/tenders-table/store/active-timer-participant.slice";
import activeTenderReducer from "../features/tender-navbar/store/tenders-list.slice";
export const store = configureStore({
  reducer: {
    activeTimerParticipant: activeTimerParticipantSlice,
    activeTender: activeTenderReducer,
    [tenderApi.reducerPath]: tenderApi.reducer,
    [tendersListApi.reducerPath]:tendersListApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(tenderApi.middleware).concat(tendersListApi.middleware)
});
// setupListeners(store.dispatch)

// import { ThunkAction, Action } from '@reduxjs/toolkit';

// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
