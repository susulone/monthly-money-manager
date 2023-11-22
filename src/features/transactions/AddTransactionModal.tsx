import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { transactionAdded } from "./transactionsSlice";
import { useAppDispatch } from "../../app/hooks";
import { toTitleCase } from "../../utils/helpers";
import "./TransactionsStyles.css";
import { X } from "react-feather";

export const AddTransactionModal = ({
    setOpenModal,
}: AddTransactionModalProps) => {
    const dispatch = useAppDispatch();

    // These need to be fetched
    const categories = [
        "groceries",
        "rent",
        "internet",
        "electricity",
        "streaming services",
        "phone",
        "emergency fund",
        "medicine",
        "income",
    ];

    // Transaction's elements
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [identifier, setIdentifier] = useState("");
    const [category, setCategory] = useState("");
    const [transactionType, setTransactionType] = useState<string>("expense");

    const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setAmount(e.target.value);
    const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setDate(e.target.value);
    const onIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setIdentifier(e.target.value);
    const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
        setCategory(e.target.value);
    const onTransactionTypeChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTransactionType(e.target.value);
    };

    const displayTransactionType = () => {
        if (transactionType !== null) {
            return transactionType === "income" ? "Add Income" : "Add Expense";
        } else {
            return "Add Transaction";
        }
    };

    const onAddTransaction = () => {
        if (amount && date && identifier && category && transactionType) {
            dispatch(
                transactionAdded({
                    id: nanoid(),
                    category,
                    date,
                    identifier,
                    amount: Number(amount),
                    transactionType,
                })
            );
            setCategory("");
            setDate("");
            setIdentifier("");
            setAmount("");
            setTransactionType("");
        }
    };

    return (
        <div className="modal-background">
            <aside className="modal-container">
                <section className="modal-heading">
                    <button
                        className="modal-btn-exit"
                        onClick={() => setOpenModal(false)}
                    >
                        <X size={18} />
                    </button>
                </section>

                <section className="modal-body">
                    <h2 className="modal-title">{displayTransactionType()}</h2>
                    <form className="modal-form">
                        {/* <p>{id}</p> */}
                        <section className="amound-and-date">
                            <section className="amound-and-date-section">
                                <label htmlFor="amount">Amount:</label>
                                <input
                                    type="number"
                                    min="0.00"
                                    step="0.01"
                                    id="amount"
                                    name="amount"
                                    value={amount}
                                    onChange={onAmountChange}
                                    required
                                />
                            </section>
                            <section className="amound-and-date-section">
                                <label htmlFor="date">Date:</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={date}
                                    onChange={onDateChange}
                                    required
                                />
                            </section>
                        </section>
                        <section className="select-and-identify">
                            <input
                                type="text"
                                id="identified"
                                name="identifier"
                                placeholder={
                                    transactionType === "expense"
                                        ? "Where did you spend this?"
                                        : "Where did this money come from?"
                                }
                                value={identifier}
                                onChange={onIdentifierChange}
                                required
                            />
                            <select
                                value={category}
                                required
                                onChange={onCategoryChange}
                            >
                                {categories.map((opt: string) => (
                                    <option
                                        value={opt}
                                        className="select-option"
                                    >
                                        {toTitleCase(opt)}
                                    </option>
                                ))}
                            </select>
                        </section>
                        <section className="radio-buttons">
                            <section className="radio-button-section">
                                <label>
                                    <input
                                        type="radio"
                                        name="transactionType"
                                        value="expense"
                                        required
                                        onChange={onTransactionTypeChange}
                                    />{" "}
                                    Expense
                                </label>
                            </section>
                            <section className="radio-button-section">
                                <label>
                                    <input
                                        type="radio"
                                        name="transactionType"
                                        value="income"
                                        required
                                        onChange={onTransactionTypeChange}
                                    />{" "}
                                    Income
                                </label>
                            </section>
                        </section>
                        <section className="modal-buttons">
                            <button
                                className="btn-cancel"
                                onClick={() => setOpenModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn-submit"
                                onClick={() => {
                                    onAddTransaction();
                                    setOpenModal(false);
                                }}
                            >
                                {displayTransactionType()}
                            </button>
                        </section>
                    </form>
                </section>
            </aside>
        </div>
    );
};
