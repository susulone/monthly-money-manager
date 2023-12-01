import { useState } from "react";
import { IconButton } from "../../common/components/IconButton/IconButton";
import "./styles.css";

export type BudgetItem = {
    id: string | number;
    budgetsGroupId: string | number;
    itemName: string;
    budgetedAmount: number;
};

type BudgetItemProps = {
    budgetItem: BudgetItem;
    handleBudgetItemEdit: (
        id: string,
        editItemName: string,
        editBudgetedAmount: string
    ) => void;
    handleBudgetItemDelete: (id: string) => void;
};

export const BudgetItem = ({
    budgetItem,
    handleBudgetItemEdit,
    handleBudgetItemDelete,
}: BudgetItemProps) => {
    const [receivedAmount, setReceivedAmount] = useState(0);
    const [editMode, setEditMode] = useState(false);

    const [editBudgetSource, setEditBudgetSource] = useState(
        budgetItem.itemName
    );
    const [editBudgetAmount, setEditBudgetAmount] = useState(
        budgetItem.budgetedAmount.toString()
    );

    return (
        <section className="budget-item-wrapper">
            {editMode ? (
                <>
                    <input
                        type="text"
                        value={editBudgetSource}
                        onChange={(e) => {
                            setEditBudgetSource(e.target.value);
                            console.log(e.target.value);
                        }}
                        className="budget-item-field"
                        id="budget-item-identifier"
                    />
                    <input
                        type="number"
                        min={0}
                        value={editBudgetAmount}
                        onChange={(e) => {
                            setEditBudgetAmount(e.target.value);
                            console.log(e.target.value);
                        }}
                        className="budget-item-field"
                    />
                    <section className="budget-item-field">
                        {receivedAmount}
                    </section>
                    <IconButton
                        iconName={"save"}
                        handleOnClick={() => {
                            handleBudgetItemEdit(
                                budgetItem.id,
                                editBudgetSource,
                                editBudgetAmount
                            );
                            setEditMode(false);
                            console.log("Save Clicked");
                        }}
                    />
                </>
            ) : (
                <>
                    <section
                        id="budget-item-identifier"
                        className="budget-item-field"
                    >
                        {budgetItem.itemName}
                    </section>
                    <section className="budget-item-field">
                        {budgetItem.budgetedAmount}
                    </section>
                    <section className="budget-item-field">
                        {receivedAmount}
                    </section>
                    <IconButton
                        iconName={"edit"}
                        handleOnClick={() => setEditMode(true)}
                    />
                </>
            )}
            <IconButton
                iconName={"delete"}
                handleOnClick={() => {
                    handleBudgetItemDelete(budgetItem.id);
                    console.log("Delete Clicked");
                }}
            />
        </section>
    );
};
