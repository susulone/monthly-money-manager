import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../../app/store";

const initialState: TransactionsState[] = [
    {
        id: "1",
        category: "income",
        date: "10/11/2023",
        identifier: "November's pay check",
        amount: 500,
        transactionType: "income",
    },
    {
        id: "2",
        category: "groceries",
        date: "21/11/2023",
        identifier: "K-Supermarket Ratina",
        amount: 25,
        transactionType: "expense",
    },
    {
        id: "3",
        category: "electricity",
        date: "11/11/2023",
        identifier: "Bednar-Cremin",
        amount: 12.99,
        transactionType: "income",
    },
    {
        id: "4",
        category: "emergency fund",
        date: "17/11/2023",
        identifier: "Roberts LLC",
        amount: 11.5,
        transactionType: "income",
    },
    {
        id: "5",
        category: "rent",
        date: "02/11/2023",
        identifier: "Hudson, Torphy and Batz",
        amount: 19.5,
        transactionType: "income",
    },
    {
        id: "6",
        category: "emergency fund",
        date: "17/11/2023",
        identifier: "Denesik-Ernser",
        amount: 10.75,
        transactionType: "expense",
    },
    {
        id: "7",
        category: "emergency fund",
        date: "06/11/2023",
        identifier: "Doyle Inc",
        amount: 7.75,
        transactionType: "expense",
    },
    {
        id: "8",
        category: "rent",
        date: "02/11/2023",
        identifier: "Beer, Zieme and Wyman",
        amount: 6.25,
        transactionType: "expense",
    },
    {
        id: "9",
        category: "emergency fund",
        date: "19/11/2023",
        identifier: "McGlynn, Abshire and Robel",
        amount: 6.5,
        transactionType: "income",
    },
    {
        id: "10",
        category: "streaming services",
        date: "03/11/2023",
        identifier: "Greenholt LLC",
        amount: 15.5,
        transactionType: "income",
    },
    {
        id: "11",
        category: "phone",
        date: "12/11/2023",
        identifier: "Watsica, Skiles and Rippin",
        amount: 15.75,
        transactionType: "expense",
    },
];

const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        transactionAdded(state, action) {
            state.push(action.payload);
        },

        // TO DO:
        // getAllTransactions <- from db
        // findTransactionById
        // editTransaction
        // deleteTransaction
        // filterTransactionsByIdentidier
    },
});

// Other code such as selectors can use the imported `RootState` type
export const selectAllTransaction = (state: RootState) => state.transactions;

export const { transactionAdded } = transactionsSlice.actions;

export default transactionsSlice.reducer;
