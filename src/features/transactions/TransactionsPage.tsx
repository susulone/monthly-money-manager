import { useState } from "react";
import { TransactionsList } from "./TransactionsList";
import { TransactionsSearchBar } from "./TransactionsSearchBar";
import { AddTransactionModal } from "./AddTransactionModal";
import { AddButton } from "../../common/components/AddButton/AddButton";

export const TransactionsPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [openModal, setOpenModal] = useState(false);
    return (
        <main id="transaction-view">
            {/* header with searchBar goes here */}
            <TransactionsSearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <TransactionsList searchQuery={searchQuery} />

            <AddButton
                handleOnClick={() => setOpenModal(true)}
                btnText="Add Transaction"
            />
            {openModal ? (
                <AddTransactionModal setOpenModal={setOpenModal} />
            ) : (
                <></>
            )}
            {/* pagination goes here */}
        </main>
    );
};
