import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState,
} from "react";

// export interface IGlobalState {
//     isLoading?: boolean;
//     loggedIn?: boolean;
// }

// export const GlobalStateContext = createContext({
//     state: {} as Partial<IGlobalState>,
//     setState: {} as Dispatch<SetStateAction<Partial<IGlobalState>>>,
// });

export const GlobalStateContext = createContext({});

const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const baseURL = `http://localhost:3000/users`;

    return (
        <GlobalStateContext.Provider
            value={{
                baseURL,
                isLoading,
                setIsLoading,
                userLoggedIn,
                setUserLoggedIn,
            }}
        >
            {children}
        </GlobalStateContext.Provider>
    );
};

export default GlobalStateProvider;
