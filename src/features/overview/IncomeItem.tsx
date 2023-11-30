import { useState } from "react";
import { IconButton } from "../../common/components/IconButton/IconButton";
import "./styles.css";

export type IncomeItem = {
    id: string;
    monthlyBudgetId: string;
    itemName: string;
    budgetedAmount: number;
};

type IncomeItemProps = {
    income: IncomeItem;
    handleIncomeEdit: (
        id: string,
        editIncomeSource: string,
        editIncomeAmount: string
    ) => void;
    handleIncomeDelete: (id: string) => void;
};

export const IncomeItem = ({
    income,
    handleIncomeEdit,
    handleIncomeDelete,
}: IncomeItemProps) => {
    const [receivedAmount, setReceivedAmount] = useState(0);

    const [editMode, setEditMode] = useState(false);

    const [editIncomeSource, setEditIncomeSource] = useState(income.itemName);
    const [editIncomeAmount, setEditIncomeAmount] = useState(
        income.budgetedAmount.toString()
    );
    return (
        <section className="income-item-wrapper">
            {editMode ? (
                <>
                    <input
                        type="text"
                        value={editIncomeSource}
                        onChange={(e) => {
                            setEditIncomeSource(e.target.value);
                            console.log(e.target.value);
                        }}
                        className="income-item-field"
                        id="income-item-identifier"
                    />
                    <input
                        type="number"
                        min={0}
                        value={editIncomeAmount}
                        onChange={(e) => {
                            setEditIncomeAmount(e.target.value);
                            console.log(e.target.value);
                        }}
                        className="income-item-field"
                    />
                    <section className="income-item-field">
                        {receivedAmount}
                    </section>
                    <IconButton
                        iconName={"save"}
                        handleOnClick={() => {
                            handleIncomeEdit(
                                income.id,
                                editIncomeSource,
                                editIncomeAmount
                            );
                            setEditMode(false);
                            console.log("Save Clicked");
                        }}
                    />
                </>
            ) : (
                <>
                    <section
                        id="income-item-identifier"
                        className="income-item-field"
                    >
                        {income.itemName}
                    </section>
                    <section className="income-item-field">
                        {income.budgetedAmount}
                    </section>
                    <section className="income-item-field">
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
                    handleIncomeDelete(income.id);
                    console.log("Delete Clicked");
                }}
            />
        </section>
    );
};
