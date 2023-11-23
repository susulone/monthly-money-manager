import { Search } from "react-feather";
import "./styles.css";

export const TransactionsSearchBar = ({
    searchQuery,
    setSearchQuery,
}: TransactionsSearchProps) => {
    return (
        <aside className="search-bar">
            <section className="form-field">
                <span className="search-icon" aria-hidden="true">
                    <Search size={20} />
                </span>
                <input
                    id="search"
                    type="text"
                    role="searchbox"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }}
                />
            </section>
            <section className="data-result"></section>
        </aside>
    );
};
