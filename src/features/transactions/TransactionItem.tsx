import { EditTransactionModal } from "./EditTransactionModal";
import "./styles.css";
import { useState } from "react";

export const TransactionItem = ({
    id,
    category,
    date,
    identifier,
    amount,
    transactionType,
}: TransactionItemProps) => {
    const [openModal, setOpenModal] = useState(false);
    // use Date().toLocaleDateString() when adding transactions' dates to db

    return (
        <>
            <article
                className="transaction-item"
                onClick={() => setOpenModal(true)}
                tabIndex={0}
            >
                <div className="transaction-id">{id}</div>
                <p className="transaction-item-date">{date}</p>
                <div className="transaction-item-section">
                    <h6 className="transaction-item-category">{category}</h6>
                    <p className="transaction-item-identifier">{identifier}</p>
                </div>
                <p className="transaction-amount">
                    {transactionType === "income" ? "+" : "-"}
                    {amount}€
                </p>
            </article>

            {openModal ? (
                <EditTransactionModal id={id} setOpenModal={setOpenModal} />
            ) : (
                <></>
            )}
        </>
    );
};
