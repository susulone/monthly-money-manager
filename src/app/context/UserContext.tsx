import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useState,
} from "react";

export type User = {
    id: string;
    monthlyBudgetIds: string[];
};

interface IUserContext {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
}

const defaultState = {
    user: {
        id: "",
        monthlyBudgetIds: [],
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
        monthlyBudgetIds: [],
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
