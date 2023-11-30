import { Outlet, useLoaderData } from "react-router-dom";
import "./App.css";
import { PrimaryNavigation } from "./common/components/PrimaryNavigation/PrimaryNavigation";

export const rootLoader = async () => {
    console.log("rootLoader ran");
    let sessionStatus;

    try {
        const userSession = await localStorage.getItem(
            "stytch_sdk_state_public-token-test-f4bd7f70-f1cf-4d97-b4a4-2f1b157024e4"
        );

        if (userSession !== null) {
            JSON.parse(userSession);
            if (userSession !== null) {
                return (sessionStatus = "active");
            } else if (userSession === null) {
                return (sessionStatus = null);
            }
        }
    } catch (err) {
        console.log(err.message);
    }
};

function App() {
    const sessionStatus = useLoaderData();
    console.log("SessionStatus:", sessionStatus);
    return (
        <div className="App">
            <PrimaryNavigation />
            <Outlet />
        </div>
    );
}

export default App;
