import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import transactionsReducer from "../features/transactions/transactionsSlice";

export const store = configureStore({
    reducer: {
        transactions: transactionsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
