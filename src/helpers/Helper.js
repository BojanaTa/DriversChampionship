import Drivers from "../components/Drivers";
import DriversDetails from "../components/DriversDetails";
import Home from "../components/Home";
import Races from "../components/Races";
import RacesDetails from "../components/RacesDetails";
import Teams from "../components/Teams";
import TeamsDetails from "../components/TeamsDetails";

export const routes = [
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
    {
        path: "/races/:id",
        element: <RacesDetails />,
        breadcrumb: () => { },
    },
];

export const getColor = (position) => {
    ///console.log(position);
    switch (position) {
        case "1":
            // console.log("yellow");
            return "gold";
        case "2":
            return "lightgray";
        case "3":
            return "lightsalmon";
        case "4":
            return "lightgreen";
        case "5":
            return "lightblue";
        case "6":
        case "7":
        case "8":
        case "9":
        case "10":
        case "11":
        case "12":
            return "palegreen";
        default:
            return "lavender";
    }
}