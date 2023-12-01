import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

// Context
import { UserContext } from "../../app/context/UserContext";
import { useGlobalState } from "../../app/hooks/useGlobalState";
import { BudgetGroupButton } from "./BudgetGroupButton";

type BudgetGroup = {
    id: string | number;
    monthlyBudgetId: string | number;
    name: string;
};

type BudgetListProps = {
    budgetGroups: BudgetGroup[];
};
export const BudgetList = ({ budgetGroups }: BudgetListProps) => {
    const { baseURL } = useGlobalState();
    const { user } = useContext(UserContext);

    return (
        <section className="budget-list-wrapper">
            {budgetGroups.length <= 0 || budgetGroups === undefined ? (
                <section id="no-content">
                    <em>There's no content yet...</em>
                </section>
            ) : (
                budgetGroups.map((budgetGroup) => {
                    return (
                        <BudgetGroupButton
                            key={budgetGroup.id}
                            budgetGroup={budgetGroup}
                        />
                    );
                })
            )}
        </section>
    );
};
