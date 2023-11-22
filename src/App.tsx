import { Outlet } from "react-router-dom";
import "./App.css";
import { PrimaryNavigation } from "./common/components/PrimaryNavigation/PrimaryNavigation";

function App() {
    return (
        <div className="App">
            <PrimaryNavigation />
            <Outlet />
        </div>
    );
}

export default App;
