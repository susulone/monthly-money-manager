import { Outlet, useLoaderData } from "react-router-dom";
import "./App.css";
import { PrimaryNavigation } from "./common/components/PrimaryNavigation/PrimaryNavigation";
// import { checkStytchSession } from "./utils/helpers";
import { useGlobalState } from "./app/hooks/useGlobalState";

export const rootLoader = () => {
    let sessionStatus = null;

    const userSession = localStorage.getItem(
        "stytch_sdk_state_public-token-test-f4bd7f70-f1cf-4d97-b4a4-2f1b157024e4"
    );
    if (userSession !== null) {
        JSON.parse(userSession);
        sessionStatus = "active";
    }
    console.log(sessionStatus);
    return { sessionStatus };
};

function App() {
    const { sessionStatus } = useLoaderData();
    const { setUserLoggedIn } = useGlobalState();

    if (sessionStatus === "active") {
        setUserLoggedIn(true);
    }

    return (
        <div className="App">
            <PrimaryNavigation />
            <Outlet />
        </div>
    );
}

export default App;
