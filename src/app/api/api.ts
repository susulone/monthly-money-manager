import axios from "axios";
import { formattedDate } from "../../utils/helpers";

const baseURL = `http://localhost:3000`;

export const addUser = async (user_id: string) => {
    try {
        const dbResponse = await axios.post(baseURL, {
            id: user_id,
        });
        console.log(dbResponse);
        return dbResponse;
    } catch (err) {
        // if (axios.isCancel(err)) {
        //     console.log("Fetch Aborted");
        //     return;
        // }
        if (err instanceof Error) {
            console.log(err.message);
        }
    }
};

// MONTHLY BUDGETS //
export const addMonthlyBudget = async (user_id: string) => {
    try {
        const dbResponse = await axios.post(`${baseURL}/monthlyBudgets`, {
            id: crypto.randomUUID(),
            budgetPeriod: formattedDate(),
            userId: user_id,
        });
        console.log(dbResponse);
        return dbResponse;
    } catch (err) {
        // if (axios.isCancel(err)) {
        //     console.log("Fetch Aborted");
        //     return;
        // }
        if (err instanceof Error) {
            console.log(err.message);
        }
    }
};

export const getUsersMonthlyBudgets = (user_id: string) => {
    const request = axios.get(`${baseURL}/monthlyBudgets`, {
        params: {
            userId: user_id,
        },
    });

    request
        .then((result) => console.log(result))
        .catch((err) => {
            if (axios.isCancel(err)) {
                console.log("Fetch Aborted");
                return;
            }
        });
    return request;
};

// function createRequest1() {
//     const request = axios.get(url)

//     request
//     .then(result => console.log('(1) Inside result:', result))
//     .catch(error => console.error('(1) Inside error:', error))

//     return request
//   }

// export const getUsersMonthlyBudgets = async (user_id: string) => {
//     try {
//         const dbResponse = await axios.get(`${baseURL}/monthlyBudgets`, {
//             params: {
//                 userId: user_id,
//             },
//         });
//         console.log(dbResponse);
//         return dbResponse;
//     } catch (err) {
//         if (axios.isCancel(err)) {
//             console.log("Fetch Aborted");
//         }
//         if (err instanceof Error) {
//             console.log(err.message);
//         }
//     }
// };

export const addIncome = async (
    monthlyBudgetId: string,
    itemName: string,
    budgetedAmount: number
) => {
    try {
        const dbResponse = await axios.post(`${baseURL}/plannedIncomes`, {
            id: crypto.randomUUID(),
            budgetedAmount,
            itemName,
            monthlyBudgetId,
        });
        console.log(dbResponse);
        return dbResponse;
    } catch (err) {
        // if (axios.isCancel(err)) {
        //     console.log("Fetch Aborted");
        //     return;
        // }
        if (err instanceof Error) {
            console.log(err.message);
        }
    }
};

export const getIncomesForMonthlyBudget = async (monthlyBudgetId: string) => {
    try {
        const response = await axios.post(`${baseURL}/plannedIncomes`, {
            params: {
                monthlyBudgetId,
            },
        });
        const data = await response.data;
        console.log(data);

        return data;
    } catch (err) {
        if (axios.isCancel(err)) {
            console.log("Fetch Aborted");
            return;
        }
        if (err instanceof Error) {
            console.log(err.message);
        }
    }
};

export const addTransaction = async (
    monthlyBudgetId: string,
    budgetGroup: string,
    category: string,
    date: string,
    identifier: string,
    amount: number,
    transactionType: "income" | "expense"
) => {
    try {
        const dbResponse = await axios.post(`${baseURL}/transactions`, {
            id: crypto.randomUUID(),
            monthlyBudgetId,
            budgetGroup,
            category,
            date,
            identifier,
            amount,
            transactionType,
        });

        console.log(dbResponse);
        return dbResponse;
    } catch (err) {
        // if (axios.isCancel(err)) {
        //     console.log("Fetch Aborted");
        //     return;
        // }
        if (err instanceof Error) {
            console.log(err.message);
        }
    }
};

export const addBudgetGroup = async (monthlyBudgetId: string, name: string) => {
    try {
        const dbResponse = await axios.post(`${baseURL}/budgetsGroups`, {
            id: crypto.randomUUID(),
            monthlyBudgetId,
            name,
        });

        console.log(dbResponse);
        return dbResponse;
    } catch (err) {
        // if (axios.isCancel(err)) {
        //     console.log("Fetch Aborted");
        //     return;
        // }
        if (err instanceof Error) {
            console.log(err.message);
        }
    }
};

export const addBudgetItem = async (
    budgetsGroupId: string,
    itemName: string,
    budgetedAmount: number
) => {
    try {
        const dbResponse = await axios.post(`${baseURL}/budgetItems`, {
            id: crypto.randomUUID(),
            budgetsGroupId,
            itemName,
            budgetedAmount,
        });

        console.log(dbResponse);
        return dbResponse;
    } catch (err) {
        // if (axios.isCancel(err)) {
        //     console.log("Fetch Aborted");
        //     return;
        // }
        if (err instanceof Error) {
            console.log(err.message);
        }
    }
};
