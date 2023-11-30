import { useState, useContext } from "react";
import axios from "axios";
import "./styles.css";
import { ChevronDown, ChevronUp } from "react-feather";
import { AddButton } from "../../common/components/AddButton/AddButton";
import { IncomeItem } from "./IncomeItem";
import { AddIncomeModal } from "./AddIncomeModal";
import { UserContext, PlannedIncome } from "../../app/context/UserContext";
import { useGlobalState } from "../../app/hooks/useGlobalState";

export const IncomeAccordion = () => {
    const { user } = useContext(UserContext);
    const { baseURL } = useGlobalState();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Accordion states
    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState(false);

    let totalPlannedIncome = 0;
    const incomes = user.monthlyBudgets[0].plannedIncomes;

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

    const removeIncome = async (id: string) => {
        try {
            const response = await axios.delete(
                `http://localhost:3001/notes/${id}`
            );
            console.log(response);
            setErrorMsg(null);
        } catch (error) {
            if (error instanceof Error) {
                setErrorMsg(error.message);
            }
        } finally {
            setIsLoading(false);
            // fetchNotes();
        }
    };

    const handleIncomeDelete = () => {};

    return (
        <section id="accordion">
            <header
                onClick={() => setIsOpen(!isOpen)}
                className={
                    isOpen ? "accordion-header opened" : "accordion-header"
                }
            >
                <p id="accordion-title">Income</p>
                <div id="accordion-icon">
                    {isOpen ? (
                        <ChevronUp color="#111c70" size={24} />
                    ) : (
                        <ChevronDown color="#111c70" size={24} />
                    )}
                </div>
            </header>
            {isOpen ? (
                <section id="accordion-body">
                    <section id="accordion-body-wrapper">
                        <section id="table-heading">
                            <section>Source</section>
                            <section>Planned</section>
                            <section>Received</section>
                        </section>

                        {incomes.length <= 0 || incomes === undefined ? (
                            <section id="no-content">
                                <em>There's no content yet...</em>
                            </section>
                        ) : (
                            incomes.map((income: PlannedIncome) => {
                                totalPlannedIncome += income.budgetedAmount;
                                return (
                                    <>
                                        <IncomeItem
                                            key={crypto.randomUUID()}
                                            id={income.id}
                                            itemName={income.itemName}
                                            budgetedAmount={
                                                income.budgetedAmount
                                            }
                                            handleIncomeEdit={handleIncomeEdit}
                                            handleIncomeDelete={() =>
                                                handleIncomeDelete(income.id)
                                            }
                                        />
                                        <section id="table-footer">
                                            <section className="table-footer-column">
                                                <AddButton
                                                    btnText="Add Income"
                                                    handleOnClick={() =>
                                                        setOpenModal(true)
                                                    }
                                                />
                                            </section>
                                            <section className="table-footer-column">
                                                {totalPlannedIncome}€
                                            </section>
                                            <section className="table-footer-column">
                                                0€
                                            </section>
                                        </section>
                                    </>
                                );
                            })
                        )}
                    </section>
                </section>
            ) : (
                <></>
            )}
            {openModal ? <AddIncomeModal setOpenModal={setOpenModal} /> : <></>}
        </section>
    );
};
