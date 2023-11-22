import { Link } from "react-router-dom";
import "./LandingPage.css";
import LandingPiggy from "../../assets/landing-piggy.svg";
import { Footer } from "../../common/components/Footer";

export const LandingPage = () => {
    return (
        <section>
            <main className="page-wrapper">
                <section className="page-section page-column">
                    <h1 className="page-heading">
                        Start feeding your piggy bank now!
                    </h1>
                    <h3 className="page-subheading">
                        Take control of your monthly money struggles now with
                        <em>
                            <strong> Monthly Money Manager</strong>
                        </em>
                    </h3>
                    <p className="page-body">
                        With us you can plan your monthly budgets and keep track
                        of your incomes and expenses.
                    </p>
                    <Link to="/register">
                        <button id="btn-register">Sign Up Now</button>
                    </Link>
                </section>
                <img
                    src={LandingPiggy}
                    alt=""
                    id="hero-img"
                    className="page-img page-column"
                />
            </main>
            <Footer />
        </section>
    );
};
