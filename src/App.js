import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Breadcrumbs from "./components/Breadcrumbs";
import Search from "./components/Search";
import GetDataContext from "./contexts/GetDataContext";
import { DataContext } from "./contexts/GetDataContext";
import { routes } from "./helpers/Helper";
import { SeasonContext } from "./components/Seasons";

const App = () => {
    const [contextValue, setContextValue] = useState({});
    const [season, setSeason] = useState(new Date().getFullYear().toString());

    const setContextValueCallback = (value) => {
        setContextValue(value);
    }

    const setSeasonCallback = (value) => {
        setSeason(value);
    }

    return (
        <div className="navigation">
            <GetDataContext currentSeason={season} callback={setContextValueCallback} />
            <Router>
                <nav className="nav-bar">
                    <div className="img">
                        <NavLink to="/"><img src="/images/F1-logo2.png" alt="Link Logo" className="img" /></NavLink>
                    </div>

                    <ul>
                        <li>
                            <NavLink to="/drivers" className={({ isActive }) => (isActive ? "link-active" : "link")}><img src="/images/helmet-white.png" alt="F1 helmet" />Drivers</NavLink>
                        </li>
                        <li>
                            <NavLink to="/teams" className={({ isActive }) => (isActive ? "link-active" : "link")}><img src="/images/Teams1.png" alt="F1 teams" />Teams</NavLink>
                        </li>
                        <li>
                            <NavLink to="/races" className={({ isActive }) => (isActive ? "link-active" : "link")}><img src="/images/racing-flags2.png" alt="F1 races" />Races</NavLink>
                        </li>
                    </ul>
                </nav>

                <div className="nav-wrap">
                    <SeasonContext.Provider value={{season, setSeasonCallback}}>
                        <DataContext.Provider
                            value={
                                {
                                    contextValue
                                }}>

                            <div className="search-nav">
                                <Breadcrumbs routes={routes} />
                                <Search />
                            </div>

                            <Routes>
                                {routes.map(route =>
                                    <Route key={route.path} path={route.path} element={route.element} />
                                )};
                            </Routes>

                        </DataContext.Provider>
                    </SeasonContext.Provider>
                </div>
            </Router>
        </div>
    );
}

export default App;
