import { Form } from "react-router-dom";
import "../transactions/styles.css";
import "./styles.css";
import { X } from "react-feather";
import { useGlobalState } from "../../app/hooks/useGlobalState";
import { useState, useContext } from "react";
import { UserContext } from "../../app/context/UserContext";
import axios from "axios";

type AddIncomeModalProps = {
    setOpenModal: (value: boolean) => void;
};

export const AddIncomeModal = ({ setOpenModal }: AddIncomeModalProps) => {
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const { baseURL } = useGlobalState();
    const { user } = useContext(UserContext);

    const addIncome = async (itemName: string, budgetAmount: number) => {
        try {
            const response = await axios.post(`${baseURL}/${user.id}`, {
                id: crypto.randomUUID(),
                itemName,
                budgetAmount,
            });
        } catch (err) {
            if (axios.isCancel(err)) {
                console.log("Fetch Aborted");
                return;
            }
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
                    <h2 className="modal-title">Add Income</h2>
                    <form
                        method="post"
                        className="modal-form"
                        onSubmit={() => {
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
