import { useState } from "react";
import { IconButton } from "../../common/components/IconButton/IconButton";
import { PlannedIncome } from "../../app/context/UserContext";
import "./styles.css";

type IncomeItemProps = {
    id: string;
    itemName: string;
    budgetedAmount: number;
    handleIncomeEdit: () => void;
    handleIncomeDelete: (id: string) => void;
};

export const IncomeItem = ({
    id,
    itemName,
    budgetedAmount,
    handleIncomeEdit,
    handleIncomeDelete,
}: IncomeItemProps) => {
    const [calculatedAmount, setCalculatedAmount] = useState(0);
    const [receivedAmount, setReceivedAmount] = useState(0);

    const [editMode, setEditMode] = useState(false);
    const [editIncomeSource, setEditIncomeSource] = useState(itemName);
    const [editIncomeAmount, setEditIncomeAmount] = useState(
        budgetedAmount.toString()
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
                        {itemName}
                    </section>
                    <section className="income-item-field">
                        {budgetedAmount}
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
                    handleIncomeDelete(id);
                    console.log("Delete Clicked");
                }}
            />
        </section>
    );
};
