import { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Drivers from "./components/Drivers";
import Teams from "./components/Teams";
import Races from "./components/Races";
import DriversDetails from "./components/DriversDetails";
import TeamsDetails from "./components/TeamsDetails";
import Home from "./components/Home";
import Breadcrumbs from "./components/Breadcrumbs";
import axios from "axios";
import Search from "./components/Search";

export const DataContext = createContext();

const App = () => {
    const routes = [
        {
            path: "/",
            element: <Home />,
            breadcrumb: "F1 - Feeder",
        },
        {
            path: "/drivers",
            element: <Drivers />,
            breadcrumb: "Drivers",
        },
        {
            path: "/drivers/:id",
            element: <DriversDetails />,
            breadcrumb: () => { },
        },
        {
            path: "/teams",
            element: <Teams />,
            breadcrumb: "Teams",
        },
        {
            path: "/teams/:id",
            element: <TeamsDetails />,
            breadcrumb: () => { },
        },
        {
            path: "/races",
            element: <Races />,
            breadcrumb: "Races",
        },
        // {
        //     path: "/races/:id",
        //     element: <RacessDetails />,
        //     breadcrumb: () => {},
        // },
    ];

    const [drivers, setDrivers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [races, setRaces] = useState([]);
    const [flagsDetails, setFlagsDetails] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        // const urlDrivers = `http://ergast.com/api/f1/2013/driverStandings.json`;
        const urlDrivers = `https://raw.githubusercontent.com/nkezic/f1/main/AllDrivers`;
        // const urlTeams = "http://ergast.com/api/f1/2013/constructorStandings.json";
        const urlTeams = "https://raw.githubusercontent.com/nkezic/f1/main/AllTeams";
        // const urlRaces = "https://ergast.com/api/f1/2013/results/1.json";
        const urlRaces = "https://raw.githubusercontent.com/nkezic/f1/main/AllRaces";
        const urlFlags = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
        const responseDrivers = await axios.get(urlDrivers);
        const responseTeams = await axios.get(urlTeams);
        const responseRaces = await axios.get(urlRaces);
        const responseFlags = await axios.get(urlFlags);
        // console.log("App drivers details", responseDrivers.data);
        console.log("App teams details", responseTeams.data);
        // console.log("App flags", responseDrivers.data);

        setDrivers(responseDrivers.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setTeams(responseTeams.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
        setRaces(responseRaces.data.MRData.RaceTable.Races);
        setFlagsDetails(responseFlags.data);
    }

    return (
        <div className="navigation">
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
                    <DataContext.Provider
                        value={
                            {
                                drivers: drivers,
                                teams: teams,
                                races: races,
                                flagsDetails: flagsDetails
                            }}>
                        <Breadcrumbs routes={routes} />

                        <Search />

                        <Routes>
                            {routes.map(route =>
                                <Route key={route.path} path={route.path} element={route.element} />
                            )};
                            {/* <Route path="/" element={<Home />} />

                    <Route path="/drivers" element={<Drivers />} />
                    <Route path="/drivers/:id" element={<DriversDetails />} />

                    <Route path="/teams" element={<Teams />} />
                    <Route path="/teams/:id" element={<TeamsDetails />} />

                    <Route path="/races" element={<Races />} /> */}
                        </Routes>
                    </DataContext.Provider>
                </div>
            </Router>
        </div>
    );
}

export default App;
