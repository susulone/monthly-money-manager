import { X } from "react-feather";
import "../transactions/styles.css";
import "./styles.css";

type AddIncomeModalProps = {
    newIncomeSource: string;
    setNewIncomeSource: (newIncomeSource: string) => void;
    newIncomeAmount: string;
    setNewIncomeAmount: (newIncomeAmount: string) => void;
    handleIncomeSubmit: (itemName: string, budgetedAmount: string) => void;
    setOpenModal: (value: boolean) => void;
};

export const AddIncomeModal = ({
    setOpenModal,
    newIncomeSource,
    setNewIncomeSource,
    newIncomeAmount,
    setNewIncomeAmount,
    handleIncomeSubmit,
}: AddIncomeModalProps) => {
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
                    <h2 className="modal-title">Add Income</h2>
                    <form
                        method="post"
                        className="modal-form"
                        onSubmit={() => {
                            handleIncomeSubmit(
                                newIncomeSource,
                                newIncomeAmount
                            );
                            setOpenModal(false);
                        }}
                    >
                        <section className="form-group">
                            <label htmlFor="newIncome" className="form-label">
                                Income source:
                            </label>
                            <input
                                type="text"
                                name="itemName"
                                id="newIncome"
                                placeholder="e.g., Side Hustle"
                                value={newIncomeSource}
                                onChange={(e) =>
                                    setNewIncomeSource(e.target.value)
                                }
                                required
                                className="form-input full-width"
                            />
                        </section>
                        <section className="form-group">
                            <label
                                htmlFor="newIncomeAmount"
                                className="form-label"
                            >
                                Planned Amount:
                            </label>
                            <input
                                type="number"
                                min={0}
                                step={0.01}
                                name="budgetedAmount"
                                id="newIncomeAmount"
                                placeholder="e.g., 300€"
                                value={newIncomeAmount}
                                onChange={(e) =>
                                    setNewIncomeAmount(e.target.value)
                                }
                                required
                                inputMode="decimal"
                                className="form-input full-width"
                            />
                        </section>
                        <input type="hidden" name="_action" value="newIncome" />
                        <section className="modal-buttons">
                            <button
                                type="reset"
                                onClick={() => setOpenModal(false)}
                                className="btn-cancel"
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn-submit">
                                Add Income
                            </button>
                        </section>
                    </form>
                </section>
            </dialog>
        </div>
    );
};
