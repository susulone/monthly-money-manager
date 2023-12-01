import React from "react";
import "./styles.css";

type BudgetGroup = {
    id: string | number;
    monthlyBudgetId: string | number;
    name: string;
};

type BudgetGroupButtonProps = {
    budgetGroup: BudgetGroup;
};

export const BudgetGroupButton = ({ budgetGroup }: BudgetGroupButtonProps) => {
    return (
        <button onClick={() => {}} className="budget-group-button">
            <p className="budget-group-title">{budgetGroup.name}</p>
        </button>
    );
};
