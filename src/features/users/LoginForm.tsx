import axios from "axios";
import { useState, useContext } from "react";
import { useStytch } from "@stytch/react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

// Context
import { UserContext } from "../../app/context/UserContext";
import { useGlobalState } from "../../app/hooks/useGlobalState";

export const LoginForm = () => {
    const navigate = useNavigate();
    const stytchClient = useStytch();

    const { setUser } = useContext(UserContext);
    const { setUserLoggedIn, setIsLoading } = useGlobalState();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const login = () => {
        stytchClient.passwords
            .authenticate({
                email,
                password,
                session_duration_minutes: 60,
            })
            .then((stytchResponse) =>
                axios.get(
                    `http://localhost:3000/users/${stytchResponse.user_id}`
                )
            )
            .then((dbResponse) => {
                setUser(dbResponse.data);
                setUserLoggedIn(true);
                setIsLoading(false);
                setErrorMsg("");
                console.log(dbResponse.data);
            })
            .catch((err) => {
                if (axios.isCancel(err)) {
                    console.log("Fetch Aborted");
                    return;
                }
                if (err instanceof Error) {
                    setErrorMsg(err.message);
                }
            });
        navigate("/overview");
    };

    return (
        <section className="login-form">
            <h2 className="form-title" id="login-form-title">
                Log in to <wbr /> your account
            </h2>
            <form>
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
                    <div>{errorMsg}</div>
                </section>
                <button className="form-btn-login" onClick={login}>
                    Sign In
                </button>
            </form>
            <section className="form-redirect">
                <Link to="/register" className="redirect-link">
                    Create account
                </Link>
            </section>
        </section>
    );
};
