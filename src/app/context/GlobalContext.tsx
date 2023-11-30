import { createContext, ReactNode, useState } from "react";

export const GlobalStateContext = createContext({});

const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    const baseURL = `http://localhost:3000`;

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
