/// <reference types="vite/client" />

interface TransactionsState {
    id: string;
    // budgetGroup: string;
    category: string;
    date: string;
    identifier: string;
    amount: number;
    transactionType: "income" | "expense";
}

type TransactionsListProps = {
    searchQuery: string;
};

type TransactionItemProps = {
    id: string;
    category: string;
    date: string;
    identifier: string;
    amount: number;
    transactionType: "income" | "expense";
    tabindex: number;
    // setOpenModal: (value: boolean) => void;
};

type TransactionsSearchProps = {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
};

type TransactionItem = {
    id: string;
    budgetGroup: string;
    category: string;
    date: string;
    identifier: string;
    amount: number;
    transactionType: "income" | "expense";
};

type EditTransactionModalProps = {
    id: string;
    setOpenModal: (value: boolean) => void;
};

type AddTransactionModalProps = {
    setOpenModal: (value: boolean) => void;
};

type NavButtonProps = {
    btnText: string;
};

type AddButtonProps = {
    btnText: string;
    handleOnClick: () => void;
};

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
