import { useState } from "react";
import "./styles.css";
import { TransactionsSearchBar } from "../../../features/transactions/TransactionsSearchBar";
import { SecondaryNavigation } from "./SecondaryNavigation";

type HeaderProps = {
    pageTitle: string;
    // searchQuery?: string;
    // setSearchQuery?: (value: string) => void;
};

export const Header = ({
    pageTitle,
}: // move these to context
// searchQuery,
// setSearchQuery,
HeaderProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <header id="header">
            <section className="header-column">
                <section id="header-main">
                    <h2 id="header-title">{pageTitle}</h2>
                    <SecondaryNavigation />
                </section>
            </section>

            {/* <section className="header-column" id="header-search">
                <TransactionsSearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
            </section> */}
        </header>
    );
};
