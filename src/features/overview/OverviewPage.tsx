import React, { useContext } from "react";
import "./styles.css";
import { Header } from "../../common/components/Header/Header";
import { IncomeAccordion } from "./IncomeAccordion";
import { useLoaderData } from "react-router-dom";
import { LoaderWheel } from "../../common/components/Loader/Loader";
import { useGlobalState } from "../../app/hooks/useGlobalState";
import { UserContext } from "../../app/context/UserContext";

export const overviewAction = async ({ request }) => {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    console.log({ data, request });
    console.log(_action);
    // try {

    // } catch (err) {
    //     throw new Error("There was a problem...")
    // }
};

export const overviewLoader = () => {};

// const addIncome = async (itemName: string, budgetAmount: number) => {
//     try {
//         const response = await axios.post(`${baseURL}/${user.id}`, {
//             itemName,
//             budgetAmount,
//         });
//     } catch (err) {
//         if (axios.isCancel(err)) {
//             console.log("Fetch Aborted");
//             return;
//         }
//     }
// };

const OverviewPage = () => {
    const { user } = useContext(UserContext);
    console.log(user);
    // const { monthlyBudgets } = useLoaderData();
    const { isLoading } = useGlobalState();
    return (
        <main>
            {isLoading ? (
                <LoaderWheel />
            ) : (
                <>
                    <Header pageTitle="Overview" />
                    {/* visualizer goes here */}
                    {/* budget list goes here */}
                    <IncomeAccordion key="income-accordion" />
                </>
            )}
        </main>
    );
};

export default OverviewPage;
