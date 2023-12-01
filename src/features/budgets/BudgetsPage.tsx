import React from "react";
import "./styles.css";
import { Header } from "../../common/components/Header/Header";
import { BudgetItemList } from "./BudgetItemList";

export const BudgetsPage = ({}) => {
    // const budgetItem = {
    //     id: 1,
    //     budgetsGroupId: 1,
    //     itemName: "Rent",
    //     budgetedAmount: 500,
    // };
    // const handleBudgetItemEdit = () => {};
    // const handleBudgetItemDelete = () => {};
    return (
        <main>
            <Header pageTitle="Budgets" />
            {/* visualizer goes here */}
            <BudgetItemList />
        </main>
    );
};
