import { useState } from "react";
import { TransactionItemType } from "./TransactionsList";
import { toTitleCase } from "../../utils/helpers";
import "./styles.css";
import { X } from "react-feather";

type EditTransactionModalProps = {
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
    handleTransactionDelete: (id: string) => void;
    setOpenModal: (value: boolean) => void;
};

export const EditTransactionModal = ({
    transaction,
    handleTransactionEdit,
    handleTransactionDelete,
    setOpenModal,
}: EditTransactionModalProps) => {
    // FIX THIS
    const [category, setCategory] = useState("groceries");
    const categories = [
        "income",
        "groceries",
        "rent",
        "internet",
        "electricity",
        "streaming services",
        "phone",
        "emergency fund",
        "medicine",
    ];

    const [editTransactionAmount, setEditTransactionAmount] = useState(
        transaction.amount.toString()
    );
    const [editTransactionDate, setEditTransactionDate] = useState(
        transaction.date
    );
    const [editTransactionIdentifier, setEditTransactionIdentifier] = useState(
        transaction.identifier
    );
    const [editTransactionType, setEditTransactionType] = useState(
        transaction.transactionType
    );
    const [editTransactionCategory, setEditTransactionCategory] = useState(
        transaction.category
    );
    const [editTransactionBudgetGroup, setEditTransactionBudgetGroup] =
        useState(transaction.budgetGroup);

    return (
        <div className="modal-background">
            <dialog open className="modal-container">
                <section className="modal-heading">
                    <button
                        className="modal-btn-exit"
                        onClick={() => setOpenModal(false)}
                    >
                        <X size={18} />
                    </button>
                </section>

                <section className="modal-body">
                    <h2 className="modal-title">Edit Transaction</h2>
                    <form
                        method="post"
                        className="modal-form"
                        onSubmit={() => {
                            handleTransactionEdit(
                                transaction.id,
                                editTransactionBudgetGroup,
                                editTransactionCategory,
                                editTransactionDate,
                                editTransactionIdentifier,
                                editTransactionAmount,
                                editTransactionType
                            );
                            setOpenModal(false);
                        }}
                    >
                        <section className="amound-and-date">
                            <section className="amound-and-date-section">
                                <label htmlFor="amount">Amount:</label>
                                <input
                                    type="number"
                                    min="0.00"
                                    step="0.01"
                                    id="amount"
                                    name="amount"
                                    value={editTransactionAmount}
                                    required
                                    onChange={(e) =>
                                        setEditTransactionAmount(e.target.value)
                                    }
                                />
                            </section>
                            <section className="amound-and-date-section">
                                <label htmlFor="date">Date:</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={editTransactionDate}
                                    required
                                    onChange={(e) =>
                                        setEditTransactionDate(e.target.value)
                                    }
                                />
                            </section>
                        </section>
                        <section className="select-and-identify">
                            <input
                                type="text"
                                id="identified"
                                name="identifier"
                                placeholder="Where did you spend this?"
                                value={editTransactionIdentifier}
                                required
                                onChange={(e) =>
                                    setEditTransactionIdentifier(e.target.value)
                                }
                            />
                            <select
                                value={editTransactionCategory}
                                required
                                onChange={(e) =>
                                    setEditTransactionCategory(e.target.value)
                                }
                                className="modal-select"
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
                        {/* FIX THIS */}
                        <section className="radio-buttons">
                            <section className="radio-button-section">
                                <label>
                                    <input
                                        type="radio"
                                        name="transactionType"
                                        checked={
                                            editTransactionType === "expense"
                                        }
                                        value="expense"
                                        onChange={(e) =>
                                            setEditTransactionType(
                                                e.target.value
                                            )
                                        }
                                    />{" "}
                                    Expense
                                </label>
                            </section>
                            <section className="radio-button-section">
                                <label>
                                    <input
                                        type="radio"
                                        name="transactionType"
                                        checked={
                                            editTransactionType === "income"
                                        }
                                        value="income"
                                        onChange={(e) =>
                                            setEditTransactionType(
                                                e.target.value
                                            )
                                        }
                                    />{" "}
                                    Income
                                </label>
                            </section>
                        </section>
                        <section className="modal-buttons">
                            <button
                                type="button"
                                className="btn-delete"
                                onClick={() => {
                                    handleTransactionDelete(transaction.id);
                                    setOpenModal(false);
                                    console.log("Delete Clicked");
                                }}
                            >
                                Delete Transaction
                            </button>
                            <button className="btn-submit">
                                Edit Transaction
                            </button>
                        </section>
                    </form>
                </section>
            </dialog>
        </div>
    );
};
