import "./styles.css";
import { useState } from "react";
import { NavLink, Form } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import { NavButton } from "../NavButton/NavButton";

export const PrimaryNavigation = () => {
    // Move state to store
    const [userSignedIn, setUserSignedIn] = useState(true);
    return (
        <nav id="primary-nav">
            <NavLink to="/" aria-label="Go to home page" id="nav-logo">
                <Logo />
            </NavLink>

            <section id="link-section">
                <NavLink to="about" aria-label="Go to about page">
                    <p>About</p>
                </NavLink>
                {userSignedIn ? (
                    <>
                        <section id="protected-routes">
                            <NavLink
                                to="overview"
                                aria-label="Go to overview page"
                            >
                                <p>Overview</p>
                            </NavLink>
                            <NavLink
                                to="budgets"
                                aria-label="Go to budgets page"
                            >
                                <p>Budgets</p>
                            </NavLink>
                            <NavLink
                                to="transactions"
                                aria-label="Go to transactions page"
                            >
                                <p>Transactions</p>
                            </NavLink>
                        </section>
                        <Form
                            method="post"
                            action="/logout"
                            onSubmit={(event) => {
                                if (
                                    !confirm("Are you sure you want to leave?")
                                ) {
                                    event.preventDefault();
                                }
                            }}
                        >
                            <NavButton btnText="Sign Out" />
                        </Form>
                    </>
                ) : (
                    <NavLink to="/login" aria-label="Sign In">
                        <NavButton btnText="Sign In" />
                    </NavLink>
                )}
            </section>
        </nav>
    );
};
