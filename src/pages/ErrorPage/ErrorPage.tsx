import { useRouteError } from "react-router-dom";
import "./ErrorPage.css";

// Components
import { Footer } from "../../common/components/Footer/";

export const ErrorPage = () => {
    const error: unknown = useRouteError();
    console.error(error);

    return (
        <section>
            <main id="error-view">
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
            </main>
            <Footer />
        </section>
    );
};
