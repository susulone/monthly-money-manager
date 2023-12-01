import React, { useState, useEffect, useContext } from "react";
import "./styles.css";
import { Header } from "../../common/components/Header/Header";
import { IncomeAccordion } from "./IncomeAccordion";
import axios from "axios";

import { LoaderWheel } from "../../common/components/Loader/Loader";
import { useGlobalState } from "../../app/hooks/useGlobalState";
import { UserContext } from "../../app/context/UserContext";
import { BudgetList } from "./BudgetList";
import { AddButton } from "../../common/components/AddButton/AddButton";
import { AddBudgetGroupModal } from "./AddBudgetGroupModal";

export const OverviewPage = () => {
    const { user } = useContext(UserContext);
    const { isLoading, baseURL } = useGlobalState();

    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [budgetGroups, setBudgetGroups] = useState([]);

    // Add New Group
    const [newBudgetGroupName, setNewBudgetGroupName] = useState("");

    const getBudgetGroupsForMonthlyBudget = async (monthlyBudgetId: string) => {
        try {
            const response = await axios.get(`${baseURL}/budgetGroups`, {
                params: {
                    monthlyBudgetId,
                },
            });
            const data = await response.data;

            setBudgetGroups(data);
            console.log("BudgetGroups", data);
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

    const addBudgetGroup = async (name: string) => {
        try {
            const dbResponse = await axios.post(`${baseURL}/budgetGroups`, {
                id: crypto.randomUUID(),
                monthlyBudgetId: user.monthlyBudgetIds[0],
                name,
            });
            console.log(dbResponse);
            return dbResponse;
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
            }
        } finally {
            setNewBudgetGroupName("");
            getBudgetGroupsForMonthlyBudget(user.monthlyBudgetIds[0]);
        }
    };

    const handleBudgetGroupSubmit = () => {
        addBudgetGroup(newBudgetGroupName);
    };

    useEffect(() => {
        getBudgetGroupsForMonthlyBudget(user.monthlyBudgetIds[0]);
    }, []);

    return (
        <main id="summary-view">
            {isLoading ? (
                <LoaderWheel />
            ) : (
                <>
                    <section>
                        <Header pageTitle="Overview" />
                        {/* visualizer goes here */}
                    </section>
                    <section>
                        <IncomeAccordion key="income-accordion" />
                        <BudgetList budgetGroups={budgetGroups} />
                        <section id="button-placement">
                            <AddButton
                                handleOnClick={() => setOpenModal(true)}
                                btnText="Add Group"
                            />
                        </section>
                    </section>
                </>
            )}

            {openModal ? (
                <AddBudgetGroupModal
                    setOpenModal={setOpenModal}
                    newBudgetGroupName={newBudgetGroupName}
                    setNewBudgetGroupName={setNewBudgetGroupName}
                    handleBudgetGroupSubmit={handleBudgetGroupSubmit}
                />
            ) : (
                <></>
            )}
        </main>
    );
};
