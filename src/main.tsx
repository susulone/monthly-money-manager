import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Redux
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

// Routes
import Root from "./App.tsx";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage.tsx";
import { LandingPage } from "./pages/LandinPage/LandingPage.tsx";
import { AboutPage } from "./pages/AboutPage/AboutPage.tsx";
import { OverviewPage } from "./features/overview/OverviewPage.tsx";
import { BudgetsPage } from "./features/budgets/BudgetsPage.tsx";
import { TransactionsPage } from "./features/transactions/TransactionsPage.tsx";

// React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        // loader: rootLoader,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <LandingPage />,
                // loader: landingPageLoader,
                errorElement: <ErrorPage />,
            },
            {
                path: "/about",
                element: <AboutPage />,
                // loader: aboutPageLoader,
                errorElement: <ErrorPage />,
            },
            {
                path: "/overview",
                element: <OverviewPage />,
                // loader: overviewPageLoader,
                errorElement: <ErrorPage />,
            },
            {
                path: "/budgets",
                element: <BudgetsPage />,
                // loader: budgetsPageLoader,
                errorElement: <ErrorPage />,
            },
            {
                path: "/transactions",
                element: <TransactionsPage />,
                // loader: transactionsPageLoader,
                errorElement: <ErrorPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
