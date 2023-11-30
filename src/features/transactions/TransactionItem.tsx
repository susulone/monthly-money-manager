import { EditTransactionModal } from "./EditTransactionModal";
import { TransactionItemType } from "./TransactionsList";
import "./styles.css";
import { useState } from "react";

type TransactionItemProps = {
    transaction: TransactionItemType;
    handleTransactionEdit: (
        id: string,
        budgetGroup: string,
        category: string,
        date: string,
        identifier: string,
        amount: string,
        transactionType: string
    ) => void;
    handleTransactionDelete: (id: string | number) => void;
};

export const TransactionItem = ({
    transaction,
    handleTransactionEdit,
    handleTransactionDelete,
}: TransactionItemProps) => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <article
                className="transaction-item"
                onClick={() => setOpenModal(true)}
                tabIndex={0}
            >
                <div className="transaction-id">{transaction.id}</div>
                <p className="transaction-item-date">{transaction.date}</p>
                <div className="transaction-item-section">
                    <h6 className="transaction-item-category">
                        {transaction.category}
                    </h6>
                    <p className="transaction-item-identifier">
                        {transaction.identifier}
                    </p>
                </div>
                <p className="transaction-amount">
                    {transaction.transactionType === "income" ? "+" : "-"}
                    {transaction.amount}€
                </p>
            </article>

            {openModal ? (
                <EditTransactionModal
                    key={transaction.id}
                    transaction={transaction}
                    handleTransactionEdit={handleTransactionEdit}
                    handleTransactionDelete={handleTransactionDelete}
                    setOpenModal={setOpenModal}
                />
            ) : (
                <></>
            )}
        </>
    );
};
