import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Redux
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

// Routes
import Root from "./App.tsx";
import { LandingPage } from "./pages/LandinPage/LandingPage.tsx";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage.tsx";

// React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TransactionsPage from "./features/transactions/TransactionsPage.tsx";

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
