import axios from "axios";
import { formattedDate } from "../../utils/helpers";

export const addUser = async (user_id: string) => {
    try {
        const dbResponse = await axios.post("http://localhost:3000/users", {
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
