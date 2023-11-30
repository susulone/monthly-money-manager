import React from "react";
import "../../pages/LandinPage/styles.css";
import { Footer } from "../../common/components/Footer";
import LoginPiggy from "../../assets/login-piggy.svg";
import { RegisterForm } from "./RegisterForm";

export const RegisterPage = () => {
    return (
        <section>
            <main className="page-wrapper">
                <section className="page-section page-column">
                    <RegisterForm />
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
