import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useState,
} from "react";

export type User = {
    id: string;
    monthlyBudgets: MonthlyBudget[];
};

export type MonthlyBudget = {
    budgetPeriod: string;
    budgets: [];
    transactions: Transaction[];
    plannedIncomes: PlannedIncome[];
};

export type Transaction = {
    id: string;
    budgetGroup: string;
    category: string;
    date: string;
    identifier: string;
    amount: number;
    transactionType: "income" | "expense";
};

export type PlannedIncome = {
    id: string;
    itemName: string;
    budgetedAmount: number;
};

interface IUserContext {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
}

const defaultState = {
    user: {
        id: "",
        monthlyBudgets: [],
    },
    setUser: (user: User) => {},
} as IUserContext;

export const UserContext = createContext<IUserContext>(defaultState);

type UserProviderProps = {
    children: ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User>({
        id: "",
        monthlyBudgets: [],
    });

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
