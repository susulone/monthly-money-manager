import "./styles.css";
import { ChevronLeft, ChevronRight } from "react-feather";

export const SecondaryNavigation = () => {
    return (
        <section id="header-navigation">
            <button className="header-navigation-btn">
                <ChevronLeft />
            </button>
            <h3>November 2023</h3>
            <button className="header-navigation-btn">
                <ChevronRight />
            </button>
        </section>
    );
};
