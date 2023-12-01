import { X } from "react-feather";
import "../transactions/styles.css";
import "./styles.css";

type AddBudgetGroupModalProps = {
    newBudgetGroupName: string;
    setNewBudgetGroupName: (newBudgetGroupName: string) => void;
    handleBudgetGroupSubmit: (name: string) => void;
    setOpenModal: (value: boolean) => void;
};

export const AddBudgetGroupModal = ({
    setOpenModal,
    newBudgetGroupName,
    setNewBudgetGroupName,
    handleBudgetGroupSubmit,
}: AddBudgetGroupModalProps) => {
    const handleCancel = () => {
        setNewBudgetGroupName("");
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
                    <h2 className="modal-title">Add New Group</h2>
                    <form
                        method="post"
                        className="modal-form"
                        onSubmit={() => {
                            handleBudgetGroupSubmit(newBudgetGroupName);
                            setOpenModal(false);
                        }}
                    >
                        <section className="form-group">
                            <label htmlFor="newIncome" className="form-label">
                                Group name:
                            </label>
                            <input
                                type="text"
                                name="itemName"
                                id="newIncome"
                                placeholder="e.g., Health"
                                value={newBudgetGroupName}
                                onChange={(e) =>
                                    setNewBudgetGroupName(e.target.value)
                                }
                                required
                                className="form-input full-width"
                            />
                            <input
                                type="hidden"
                                name="_action"
                                value="newIncome"
                            />
                        </section>
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
                                Add Group
                            </button>
                        </section>
                    </form>
                </section>
            </dialog>
        </div>
    );
};
