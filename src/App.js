import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Drivers from "./components/Drivers";
import Teams from "./components/Teams";
import Races from "./components/Races";
import DriversDetails from "./components/DriversDetails";



const App = () => {
    return (
        <div className="navigation">
            <div>
                <img src="/images/F1-logo.png" alt="Drivers Logo"/> 

            </div>

            <Router>

                <nav className="nav-bar">
                    <ul>
                        <li>
                            <Link to="/">Drivers</Link>
                        </li>
                        <li>
                            <Link to="/teams">Teams</Link>
                        </li>
                        <li>
                            <Link to="/races">Races</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<Drivers />} />
                    <Route path="/details/:id" element={<DriversDetails />} />

                    <Route path="/teams" element={<Teams />} />
                    <Route path="/races" element={<Races />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
