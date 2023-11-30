import "../../pages/LandinPage/styles.css";
import { Footer } from "../../common/components/Footer";
import LoginPiggy from "../../assets/login-piggy.svg";
import { LoginForm } from "./LoginForm";

export const loginLoader = () => {
    console.log("loginLoader ran");
    return null;
};

const LoginPage = () => {
    return (
        <section>
            <main className="page-wrapper">
                <section className="page-section page-column">
                    <LoginForm />
                </section>
                <img
                    src={LoginPiggy}
                    alt=""
                    id="login-img"
                    className="page-img page-column"
                />
            </main>
            <Footer />
        </section>
    );
};

export default LoginPage;
