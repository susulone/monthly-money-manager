import { ReactNode, createContext, useState } from "react";

// type SearchType = {
//     searchQuery: string;
//     // setSearchQuery: React.Dispatch<React.SetStateAction<SearchType>>;
// };

interface SearchContextProps {
    searchQuery?: string;
    setSearchQuery?: (searchQuery: string) => void;
}

type SearchProviderProps = {
    children: ReactNode;
};

export const SearchContext = createContext<SearchContextProps | null>(null);

export const SearchProvider = ({ children }: SearchProviderProps) => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    return (
        <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
            {children}
        </SearchContext.Provider>
    );
};

export default SearchProvider;
