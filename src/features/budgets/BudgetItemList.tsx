import { useState } from "react";
import "./styles.css";
import { BudgetItem } from "./BudgetItem";
import { AddButton } from "../../common/components/AddButton/AddButton";
import { AddBudgetItemModal } from "./AddBudgetItemModal";

export const BudgetItemList = () => {
    const [openModal, setOpenModal] = useState(false);
    const [newItemName, setNewItemName] = useState("");
    const [newItemAmount, setNewItemAmount] = useState("");

    const handleBudgetItemEdit = () => {};
    const handleBudgetItemDelete = () => {};
    const handleItemSubmit = () => {};

    const budgetItems = [
        {
            id: 1,
            budgetsGroupId: 1,
            itemName: "Rent",
            budgetedAmount: 500,
        },
    ];

    return (
        <section className="budget-item-list-wrapper">
            <section id="add-button-placement">
                <AddButton
                    handleOnClick={() => setOpenModal(true)}
                    btnText="Add Budget Item"
                />
            </section>
            <section id="budget-item-list-body">
                <section id="table-heading">
                    <section>Source</section>
                    <section>Planned</section>
                    <section>Received</section>
                </section>

                {budgetItems.length <= 0 || budgetItems === undefined ? (
                    <section id="no-content">
                        <em>There's no content yet...</em>
                    </section>
                ) : (
                    budgetItems.map((budgetItem) => {
                        return (
                            <BudgetItem
                                budgetItem={budgetItem}
                                handleBudgetItemEdit={handleBudgetItemEdit}
                                handleBudgetItemDelete={handleBudgetItemDelete}
                            />
                        );
                    })
                )}
            </section>
            {openModal ? (
                <AddBudgetItemModal
                    newItemName={newItemName}
                    setNewItemName={setNewItemName}
                    newItemAmount={newItemAmount}
                    setNewItemAmount={setNewItemAmount}
                    handleItemSubmit={handleItemSubmit}
                    setOpenModal={setOpenModal}
                />
            ) : (
                <></>
            )}
        </section>
    );
};
