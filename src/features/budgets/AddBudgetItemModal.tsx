import { X } from "react-feather";
import "../transactions/styles.css";
import "./styles.css";

type AddBudgetItemModalProps = {
    newItemName: string;
    setNewItemName: (newItemName: string) => void;
    newItemAmount: string;
    setNewItemAmount: (newItemAmount: string) => void;
    handleItemSubmit: (itemName: string, budgetedAmount: string) => void;
    setOpenModal: (value: boolean) => void;
};

export const AddBudgetItemModal = ({
    newItemName,
    setNewItemName,
    newItemAmount,
    setNewItemAmount,
    handleItemSubmit,
    setOpenModal,
}: AddBudgetItemModalProps) => {
    const handleCancel = () => {
        setNewItemName("");
        setNewItemAmount("");
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
                    <h2 className="modal-title">Add Budget Item</h2>
                    <form
                        method="post"
                        className="modal-form"
                        onSubmit={() => {
                            handleItemSubmit(newItemName, newItemAmount);
                            setOpenModal(false);
                        }}
                    >
                        <section className="form-group">
                            <label htmlFor="newIncome" className="form-label">
                                Income name:
                            </label>
                            <input
                                type="text"
                                name="itemName"
                                id="newIncome"
                                placeholder="e.g., Medicine"
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
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
                                placeholder="e.g., 50€"
                                value={newItemAmount}
                                onChange={(e) =>
                                    setNewItemAmount(e.target.value)
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
                                onClick={() => {
                                    handleCancel();
                                    setOpenModal(false);
                                }}
                                className="btn-cancel"
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn-submit">
                                Add Item
                            </button>
                        </section>
                    </form>
                </section>
            </dialog>
        </div>
    );
};
