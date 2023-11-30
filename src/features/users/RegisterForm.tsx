import { useState, useContext } from "react";
import { useStytch } from "@stytch/react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

// Context
import { UserContext } from "../../app/context/UserContext";
import { useGlobalState } from "../../app/hooks/useGlobalState";
import { addUser, addMonthlyBudget } from "../../app/api/api";

export const RegisterForm = () => {
    const navigate = useNavigate();
    const stytchClient = useStytch();

    const { setUser } = useContext(UserContext);
    const { setIsLoading, setUserLoggedIn } = useGlobalState();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [passwordMsg, setPasswordMsg] = useState("");
    const [warningMsg, setWarningMsg] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const signUp = async () => {
        try {
            const response = await stytchClient.passwords.strengthCheck({
                email,
                password,
            });
            setPasswordMsg(response.feedback.suggestions[0]);
            setWarningMsg(response.feedback.warning);
            console.log("Success", response);

            if (response.valid_password) {
                const stytchResponse = await stytchClient.passwords.create({
                    email,
                    password,
                    session_duration_minutes: 60,
                });
                // Create New User
                const userResponse = await addUser(stytchResponse.user_id);
                // Create New MonthlyBudget for the user
                const budgetResponse = await addMonthlyBudget(
                    stytchResponse.user_id
                );
                if (
                    userResponse.status === 201 &&
                    budgetResponse.status === 201
                ) {
                    setUser({
                        id: userResponse?.data.id,
                        monthlyBudgetIds: [budgetResponse?.data.id],
                    });

                    setUserLoggedIn(true);
                    setIsLoading(false);
                    setErrorMessage("");
                }
            }
        } catch (err) {
            if (err instanceof Error) {
                setErrorMessage(err.message);
            }
            console.log(errorMessage);
        }

        // TO DO: prevent navigation if create is not successfull
        navigate("/overview");
    };

    return (
        <section className="login-form">
            <h2 className="form-title">
                Create <wbr />
                your account
            </h2>
            <div>
                <section className="form-group">
                    <label htmlFor="email" className="form-label">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane.doe@example.com"
                        autoComplete="email"
                        className="form-input"
                    />
                </section>
                <section className="form-group">
                    <label htmlFor="password" className="form-label">
                        Password:
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        id="password"
                        name="password"
                        autoComplete="password"
                        className="form-input"
                    />
                    <label>{warningMsg}</label>
                    <label>{passwordMsg}</label>
                </section>
                <button className="form-btn-login" onClick={signUp}>
                    Sign Up
                </button>
            </div>
            <section className="form-redirect">
                <p>Already have an account?</p>
                <Link to="/login" className="redirect-link">
                    Sign In
                </Link>
            </section>
        </section>
    );
};
