import { toTitleCase } from "../../utils/helpers";
import { X } from "react-feather";
import "./styles.css";

type AddTransactionModalProps = {
    newAmount: string;
    setNewAmount: (amount: string) => void;
    newDate: string;
    setNewDate: (date: string) => void;
    newIdentifier: string;
    setNewIdentifier: (identifier: string) => void;
    newCategory: string;
    setNewCategory: (category: string) => void;
    newBudgetGroup: string;
    setNewBudgetGroup: (budgetGroup: string) => void;
    newTransactionType: string;
    setNewTransactionType: (transactionType: string) => void;
    handleTransactionSubmit: (
        amount: string,
        date: string,
        identifier: string,
        category: string,
        transactionType: string
    ) => void;
    setOpenModal: (value: boolean) => void;
};
export const AddTransactionModal = ({
    newAmount,
    setNewAmount,
    newDate,
    setNewDate,
    newIdentifier,
    setNewIdentifier,
    newCategory,
    setNewCategory,
    newBudgetGroup,
    setNewBudgetGroup,
    newTransactionType,
    setNewTransactionType,
    handleTransactionSubmit,
    setOpenModal,
}: AddTransactionModalProps) => {
    // const dispatch = useAppDispatch();

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

    const displayTransactionType = () => {
        if (newTransactionType !== null) {
            return newTransactionType === "income"
                ? "Add Income"
                : "Add Expense";
        } else {
            return "Add Transaction";
        }
    };
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
                    <h2 className="modal-title">{displayTransactionType()}</h2>
                    <form
                        method="post"
                        onSubmit={() => {
                            handleTransactionSubmit(
                                newAmount,
                                newDate,
                                newIdentifier,
                                newCategory,
                                newTransactionType
                            );
                            setOpenModal(false);
                        }}
                        className="modal-form"
                    >
                        <section className="amound-and-date">
                            <section className="amound-and-date-section">
                                <label htmlFor="amount">Amount:</label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    id="amount"
                                    name="amount"
                                    value={newAmount}
                                    required
                                    onChange={(e) =>
                                        setNewAmount(e.target.value)
                                    }
                                />
                            </section>
                            <section className="amound-and-date-section">
                                <label htmlFor="date">Date:</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    placeholder={Date()}
                                    value={newDate}
                                    required
                                    onChange={(e) => setNewDate(e.target.value)}
                                />
                            </section>
                        </section>
                        <section className="select-and-identify">
                            <input
                                type="text"
                                id="identified"
                                name="identifier"
                                placeholder={
                                    newTransactionType === "expense"
                                        ? "Where did you spend this?"
                                        : "Where did this money come from?"
                                }
                                value={newIdentifier}
                                required
                                onChange={(e) =>
                                    setNewIdentifier(e.target.value)
                                }
                            />

                            <select
                                value={newCategory}
                                required
                                onChange={(e) => setNewCategory(e.target.value)}
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
                                        onChange={(e) =>
                                            setNewTransactionType(
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
                                        value="income"
                                        required
                                        onChange={(e) =>
                                            setNewTransactionType(
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
                                type="reset"
                                className="btn-cancel"
                                onClick={() => setOpenModal(false)}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn-submit">
                                {displayTransactionType()}
                            </button>
                        </section>
                    </form>
                </section>
            </dialog>
        </div>
    );
};
