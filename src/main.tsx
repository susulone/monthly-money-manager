import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Contexts
import GlobalStateProvider from "./app/context/GlobalContext.tsx";
import UserProvider from "./app/context/UserContext.tsx";

// Stytch
import { StytchHeadlessClient } from "@stytch/vanilla-js/headless";
import { StytchProvider } from "@stytch/react";

// MOVE TOKEN TO .ENV FILE
const stytchClient = new StytchHeadlessClient(
    "public-token-test-f4bd7f70-f1cf-4d97-b4a4-2f1b157024e4"
);

// Routes
import Root, { rootLoader } from "./App.tsx";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage.tsx";
import { LandingPage } from "./pages/LandinPage/LandingPage.tsx";
import { LoginPage } from "./features/users/LoginPage.tsx";
import { RegisterPage } from "./features/users/RegisterPage.tsx";
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
        loader: rootLoader,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <LandingPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/about",
                element: <AboutPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/login",
                element: <LoginPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/register",
                element: <RegisterPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/overview",
                element: <OverviewPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/budgets",
                element: <BudgetsPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/transactions",
                element: <TransactionsPage />,
                errorElement: <ErrorPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <StytchProvider stytch={stytchClient}>
            <GlobalStateProvider>
                <UserProvider>
                    <RouterProvider router={router} />
                </UserProvider>
            </GlobalStateProvider>
        </StytchProvider>
    </React.StrictMode>
);
