import { useContext, useEffect, useState } from "react";
import axios from "axios";

// Context
import { UserContext } from "../../app/context/UserContext";
import { useGlobalState } from "../../app/hooks/useGlobalState";
import SearchProvider from "../../app/context/SearchContext";

// Components
import { Header } from "../../common/components/Header/Header";
import { TransactionsList } from "./TransactionsList";
import { AddButton } from "../../common/components/AddButton/AddButton";
import { AddTransactionModal } from "./AddTransactionModal";

export const TransactionsPage = () => {
    const { baseURL } = useGlobalState();
    const { user } = useContext(UserContext);

    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const [openModal, setOpenModal] = useState(false);
    const [transactions, setTransactions] = useState([]);

    // Add New Transaction
    const [newAmount, setNewAmount] = useState("");
    const [newDate, setNewDate] = useState("");
    const [newIdentifier, setNewIdentifier] = useState("");
    const [newTransactionType, setNewTransactionType] = useState("expense");
    const [newCategory, setNewCategory] = useState("");
    const [newBudgetGroup, setNewBudgetGroup] = useState("");

    const getTransactionsForMonthlyBudget = async (monthlyBudgetId: string) => {
        try {
            const response = await axios.get(`${baseURL}/transactions`, {
                params: {
                    monthlyBudgetId,
                },
            });
            const data = await response.data;

            setTransactions(data);
            console.log("Transactions", data);
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

    const addTransaction = async (
        budgetGroup: string,
        category: string,
        date: string,
        identifier: string,
        amount: string,
        transactionType: string
    ) => {
        try {
            const dbResponse = await axios.post(`${baseURL}/transactions`, {
                id: crypto.randomUUID(),
                monthlyBudgetId: user.monthlyBudgetIds[0],
                budgetGroup,
                category,
                date,
                identifier,
                amount: Number(amount),
                transactionType,
            });
            console.log(dbResponse);
            return dbResponse;
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
            }
        } finally {
            setNewBudgetGroup("");
            setNewCategory("");
            setNewAmount("");
            setNewDate("");
            setNewIdentifier("");
            setNewTransactionType("expense");
            getTransactionsForMonthlyBudget(user.monthlyBudgetIds[0]);
        }
    };

    const handleTransactionSubmit = () => {
        addTransaction(
            newBudgetGroup,
            newCategory,
            newDate,
            newIdentifier,
            newAmount,
            newTransactionType
        );
    };

    const deleteTransaction = async (id: string | number) => {
        try {
            const response = await axios.delete(
                `${baseURL}/transactions/${id}`
            );
            console.log(response);
            setErrorMsg(null);
        } catch (err) {
            if (err instanceof Error) {
                setErrorMsg(err.message);
            }
        } finally {
            getTransactionsForMonthlyBudget(user.monthlyBudgetIds[0]);
        }
    };

    const handleTransactionDelete = (id: string | number) => {
        deleteTransaction(id);
    };

    const editTransaction = async (
        id: string,
        budgetGroup: string,
        category: string,
        date: string,
        identifier: string,
        amount: string,
        transactionType: string
    ) => {
        try {
            const response = await axios.put(`${baseURL}/transactions/${id}`, {
                id,
                monthlyBudgetId: user.monthlyBudgetIds[0],
                budgetGroup,
                category,
                date,
                identifier,
                amount: Number(amount),
                transactionType,
            });
            console.log(response.data);
            setErrorMsg(null);
        } catch (error) {
            if (error instanceof Error) {
                setErrorMsg(error.message);
            }
        } finally {
            // setIsLoading(false);
            getTransactionsForMonthlyBudget(user.monthlyBudgetIds[0]);
        }
    };

    const handleTransactionEdit = (
        id: string,
        budgetGroup: string,
        category: string,
        date: string,
        identifier: string,
        amount: string,
        transactionType: string
    ) => {
        editTransaction(
            id,
            budgetGroup,
            category,
            date,
            identifier,
            amount,
            transactionType
        );
    };

    useEffect(() => {
        getTransactionsForMonthlyBudget(user.monthlyBudgetIds[0]);
    }, []);

    return (
        <main id="transaction-view">
            <SearchProvider>
                <Header pageTitle="Transactions" />
                {/* header with searchBar goes here */}
                <TransactionsList
                    transactions={transactions}
                    handleTransactionEdit={handleTransactionEdit}
                    handleTransactionDelete={handleTransactionDelete}
                />
            </SearchProvider>

            <AddButton
                handleOnClick={() => setOpenModal(true)}
                btnText="Add Transaction"
            />
            {openModal ? (
                <AddTransactionModal
                    key={crypto.randomUUID()}
                    newAmount={newAmount}
                    setNewAmount={setNewAmount}
                    newDate={newDate}
                    setNewDate={setNewDate}
                    newIdentifier={newIdentifier}
                    setNewIdentifier={setNewIdentifier}
                    newCategory={newCategory}
                    setNewCategory={setNewCategory}
                    newBudgetGroup={newBudgetGroup}
                    setNewBudgetGroup={setNewBudgetGroup}
                    newTransactionType={newTransactionType}
                    setNewTransactionType={setNewTransactionType}
                    handleTransactionSubmit={handleTransactionSubmit}
                    setOpenModal={setOpenModal}
                />
            ) : (
                <></>
            )}
            {/* pagination goes here */}
        </main>
    );
};
