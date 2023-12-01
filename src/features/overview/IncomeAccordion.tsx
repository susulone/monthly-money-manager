import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

// Components
import { AddIncomeModal } from "./AddIncomeModal";
import { IncomeItem } from "./IncomeItem";
import { AddButton } from "../../common/components/AddButton/AddButton";
import { ChevronDown, ChevronUp } from "react-feather";

// Context
import { UserContext } from "../../app/context/UserContext";
import { useGlobalState } from "../../app/hooks/useGlobalState";

export const IncomeAccordion = () => {
    const { baseURL } = useGlobalState();
    const { user } = useContext(UserContext);

    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Accordion states
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState(false);

    const [incomes, setIncomes] = useState([]);
    const [newIncomeSource, setNewIncomeSource] = useState("");
    const [newIncomeAmount, setNewIncomeAmount] = useState("");

    let totalPlannedIncome = 0;

    const getIncomesForMonthlyBudget = async (monthlyBudgetId: string) => {
        try {
            const response = await axios.get(`${baseURL}/plannedIncomes`, {
                params: {
                    monthlyBudgetId,
                },
            });
            const data = await response.data;

            setIncomes(data);
            console.log(data);
            setErrorMsg(null);
        } catch (err) {
            if (axios.isCancel(err)) {
                console.log("Fetch Aborted");
                return;
            }
            if (err instanceof Error) {
                setErrorMsg(err.message);
            }
        }
    };

    const addIncome = async (itemName: string, budgetedAmount: string) => {
        try {
            const dbResponse = await axios.post(`${baseURL}/plannedIncomes`, {
                id: crypto.randomUUID(),
                monthlyBudgetId: user.monthlyBudgetIds[0],
                itemName,
                budgetedAmount: Number(budgetedAmount),
            });
            console.log(dbResponse);
            return dbResponse;
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
            }
        } finally {
            setNewIncomeSource("");
            setNewIncomeAmount("");
            getIncomesForMonthlyBudget(user.monthlyBudgetIds[0]);
        }
    };

    const handleIncomeSubmit = (itemName: string, budgetedAmount: string) => {
        addIncome(itemName, budgetedAmount);
    };

    const deleteIncome = async (id: string | number) => {
        try {
            const response = await axios.delete(
                `${baseURL}/plannedIncomes/${id}`
            );
            console.log(response);
            setErrorMsg(null);
        } catch (err) {
            if (err instanceof Error) {
                setErrorMsg(err.message);
            }
        } finally {
            getIncomesForMonthlyBudget(user.monthlyBudgetIds[0]);
        }
    };

    const handleIncomeDelete = (id: string | number) => {
        deleteIncome(id);
    };

    const editIncome = async (
        id: string,
        itemName: string,
        budgetedAmount: string
    ) => {
        try {
            const response = await axios.put(
                `${baseURL}/plannedIncomes/${id}`,
                {
                    id,
                    monthlyBudgetId: user.monthlyBudgetIds[0],
                    itemName,
                    budgetedAmount: Number(budgetedAmount),
                }
            );
            console.log(response.data);
            setErrorMsg(null);
        } catch (error) {
            if (error instanceof Error) {
                setErrorMsg(error.message);
            }
        } finally {
            // setIsLoading(false);
            getIncomesForMonthlyBudget(user.monthlyBudgetIds[0]);
        }
    };

    const handleIncomeEdit = (
        id: string,
        itemName: string,
        budgetedAmount: string
    ) => {
        editIncome(id, itemName, budgetedAmount);
    };

    useEffect(() => {
        getIncomesForMonthlyBudget(user.monthlyBudgetIds[0]);
    }, []);

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
                            incomes.map((income: IncomeItem) => {
                                totalPlannedIncome += Number(
                                    income.budgetedAmount
                                );

                                console.log(totalPlannedIncome);
                                return (
                                    <>
                                        <IncomeItem
                                            key={income.id}
                                            income={income}
                                            handleIncomeEdit={handleIncomeEdit}
                                            handleIncomeDelete={
                                                handleIncomeDelete
                                            }
                                        />
                                    </>
                                );
                            })
                        )}
                        <section id="table-footer">
                            <section className="table-footer-column">
                                <AddButton
                                    btnText="Add Income"
                                    handleOnClick={() => setOpenModal(true)}
                                />
                            </section>
                            <section className="table-footer-column">
                                {totalPlannedIncome}€
                            </section>
                            <section className="table-footer-column">
                                0€
                            </section>
                        </section>
                    </section>
                </section>
            ) : (
                <></>
            )}
            {openModal ? (
                <AddIncomeModal
                    setOpenModal={setOpenModal}
                    newIncomeSource={newIncomeSource}
                    setNewIncomeSource={setNewIncomeSource}
                    newIncomeAmount={newIncomeAmount}
                    setNewIncomeAmount={setNewIncomeAmount}
                    handleIncomeSubmit={handleIncomeSubmit}
                />
            ) : (
                <></>
            )}
        </section>
    );
};
