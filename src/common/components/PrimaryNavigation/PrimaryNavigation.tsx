import "./styles.css";
import { useEffect } from "react";
import { useStytch } from "@stytch/react";
import { NavLink, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { NavButton } from "./NavButton";
// import { AuthContext } from "../../../app/context/AuthContext";
import { useGlobalState } from "../../../app/hooks/useGlobalState";

export const PrimaryNavigation = () => {
    const { userLoggedIn, setUserLoggedIn, setIsLoading } = useGlobalState();
    // const { userSignedIn, toggleUserStatus } = useContext(AuthContext);
    const stytchClient = useStytch();
    const navigate = useNavigate();

    const logout = () => {
        stytchClient.session.revoke();
        setUserLoggedIn(false);
        // setIsLoading(true);
        navigate("/");
    };

    return (
        <nav id="primary-nav">
            <NavLink to="/" aria-label="Go to home page" id="nav-logo">
                <Logo />
            </NavLink>

            <section id="link-section">
                <NavLink to="about" aria-label="Go to about page">
                    <p>About</p>
                </NavLink>
                {userLoggedIn ? (
                    <>
                        <section id="protected-routes">
                            <NavLink
                                to="/overview"
                                aria-label="Go to overview page"
                            >
                                <p>Overview</p>
                            </NavLink>
                            <NavLink
                                to="/budgets"
                                aria-label="Go to budgets page"
                            >
                                <p>Budgets</p>
                            </NavLink>
                            <NavLink
                                to="/transactions"
                                aria-label="Go to transactions page"
                            >
                                <p>Transactions</p>
                            </NavLink>
                        </section>
                        {/* <Form
                            method="post"
                            action="/logout"
                            onSubmit={(event) => {
                                if (
                                    !confirm("Are you sure you want to leave?")
                                ) {
                                    event.preventDefault();
                                }
                            }}
                        > */}
                        <NavButton btnText="Sign Out" handleOnClick={logout} />
                        {/* </Form> */}
                    </>
                ) : (
                    <NavButton
                        btnText="Sign In"
                        aria-label="Sign In"
                        handleOnClick={() => navigate("/login")}
                    />
                )}
            </section>
        </nav>
    );
};
