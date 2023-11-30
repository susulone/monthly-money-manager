import axios from "axios";
import { formattedDate } from "../../utils/helpers";

const baseURL = `http://localhost:3000/users`;

export const addUser = async (user_id: string) => {
    try {
        const dbResponse = await axios.post(baseURL, {
            id: user_id,
            monthlyBudgets: [
                {
                    budgetPeriod: formattedDate(),
                    budgets: [],
                    transactions: [],
                    plannedIncomes: [],
                },
            ],
        });
        console.log(dbResponse);
        return dbResponse;
    } catch (err) {
        if (axios.isCancel(err)) {
            console.log("Fetch Aborted");
            return;
        }
    }
};
