import { useState, useRef } from "react";
import { toTitleCase } from "../../utils/helpers";
import "./styles.css";
import { X } from "react-feather";

export const EditTransactionModal = ({
    id,
    setOpenModal,
}: EditTransactionModalProps) => {
    const [category, setCategory] = useState("groceries");
    const categories = [
        "groceries",
        "rent",
        "internet",
        "electricity",
        "streaming services",
        "phone",
        "emergency fund",
        "medicine",
    ];

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
                    <form className="modal-form">
                        <p>{id}</p>
                        <section className="amound-and-date">
                            <section className="amound-and-date-section">
                                <label htmlFor="amount">Amount:</label>
                                <input
                                    type="number"
                                    min="0.00"
                                    step="0.01"
                                    id="amount"
                                    name="amount"
                                    required
                                />
                            </section>
                            <section className="amound-and-date-section">
                                <label htmlFor="date">Date:</label>
                                <input type="date" id="date" name="date" />
                            </section>
                        </section>
                        <section className="select-and-identify">
                            <input
                                type="text"
                                id="identified"
                                name="identifier"
                                placeholder="Where did you spend this?"
                                required
                            />
                            <select
                                value={category}
                                required
                                onChange={(e) => setCategory(e.target.value)}
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
                                        value="income"
                                    />{" "}
                                    Income
                                </label>
                            </section>
                            <section className="radio-button-section">
                                <label>
                                    <input
                                        type="radio"
                                        name="transactionType"
                                        value="expense"
                                    />{" "}
                                    Expense
                                </label>
                            </section>
                        </section>
                        <section className="modal-buttons">
                            <button className="btn-delete">
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
