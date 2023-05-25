import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Drivers from "./components/Drivers";
import Teams from "./components/Teams";
import Races from "./components/Races";
import DriversDetails from "./components/DriversDetails";
import TeamsDetails from "./components/TeamsDetails";



const App = () => {
    return (
        <div className="navigation">

            <Router>

                <nav className="nav-bar">
                    <div className="img">
                        <img src="/images/F1-logo.png" alt="Link Logo" />
                    </div>

                    <ul>
                        <li>
                            <NavLink to="/" className={({isActive}) => (isActive ? "link-active" : "link")}><img src="/images/helmet-white.png" alt="F1 helmet" />  Drivers</NavLink>
                        </li>
                        <li>
                            <NavLink to="/teams" className={({isActive}) => (isActive ? "link-active" : "link")}><img src="/images/Teams1.png" alt="F1 teams" />Teams</NavLink>
                        </li>
                        <li>
                            <NavLink to="/races" className={({isActive}) => (isActive ? "link-active" : "link")}><img src="/images/racing-flags2.png" alt="F1 races" />Races</NavLink>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<Drivers />} />
                    <Route path="/drivers/:id" element={<DriversDetails />} />


                    <Route path="/teams" element={<Teams />} />
                    <Route path="/teams/:id" element={<TeamsDetails />} />

                   

                    <Route path="/races" element={<Races />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
