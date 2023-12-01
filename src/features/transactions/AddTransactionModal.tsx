import { toTitleCase } from "../../utils/helpers";
import { X } from "react-feather";
import "./styles.css";

type AddTransactionModalProps = {
    newAmount: string;
    setNewAmount: (newAmount: string) => void;
    newDate: string;
    setNewDate: (newDate: string) => void;
    newIdentifier: string;
    setNewIdentifier: (newIdentifier: string) => void;
    newCategory: string;
    setNewCategory: (newCategory: string) => void;
    newBudgetGroup: string;
    setNewBudgetGroup: (newBudgetGroup: string) => void;
    newTransactionType: string;
    setNewTransactionType: (newTransactionType: string) => void;
    handleTransactionSubmit: (
        newAmount: string,
        newDate: string,
        newIdentifier: string,
        newCategory: string,
        newTransactionType: string
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
    const handleCancel = () => {
        setNewAmount("");
        setNewDate("");
        setNewIdentifier("");
        setNewCategory("");
        setNewTransactionType("expense");
    };

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
                        onClick={() => {
                            handleCancel();
                            setOpenModal(false);
                        }}
                    >
                        <X size={18} />
                    </button>
                </section>

                <section className="modal-body">
                    <h2 className="modal-title">{displayTransactionType()}</h2>
                    <form
                        method="post"
                        className="modal-form"
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
                    >
                        <section className="amound-and-date">
                            <section className="amound-and-date-section">
                                <label htmlFor="amount">Amount:</label>
                                <input
                                    type="number"
                                    min={0}
                                    step={0.01}
                                    id="amount"
                                    name="amount"
                                    placeholder="e.g., 300€"
                                    value={newAmount}
                                    onChange={(e) =>
                                        setNewAmount(e.target.value)
                                    }
                                    required
                                    inputMode="decimal"
                                />
                            </section>
                            <section className="amound-and-date-section">
                                <label htmlFor="date">Date:</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={newDate}
                                    onChange={(e) => setNewDate(e.target.value)}
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
                                    newTransactionType === "expense"
                                        ? "Where did you spend this?"
                                        : "Where did this money come from?"
                                }
                                value={newIdentifier}
                                onChange={(e) =>
                                    setNewIdentifier(e.target.value)
                                }
                                required
                            />

                            <select
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                required
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
                                        checked={
                                            newTransactionType === "expense"
                                        }
                                        onChange={(e) =>
                                            setNewTransactionType(
                                                e.target.value
                                            )
                                        }
                                        required
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
                                            newTransactionType === "income"
                                        }
                                        value="income"
                                        onChange={(e) =>
                                            setNewTransactionType(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />{" "}
                                    Income
                                </label>
                            </section>
                        </section>
                        <section className="modal-buttons">
                            <button
                                type="reset"
                                className="btn-cancel"
                                onClick={() => {
                                    handleCancel();
                                    setOpenModal(false);
                                }}
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
