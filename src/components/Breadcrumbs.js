import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import axios from "axios";

const Breadcrumbs = ({ routes }) => {
    const breadcrumbs = useBreadcrumbs(routes);
    const [drivers, setDrivers] = useState([]);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const urlDrivers = `http://ergast.com/api/f1/2013/driverStandings.json`;
        const urlTeams = `http://ergast.com/api/f1/2013/constructorStandings.json`;
        const responseDrivers = await axios.get(urlDrivers);
        const responseTeams = await axios.get(urlTeams);
        setDrivers(responseDrivers.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setTeams(responseTeams.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
    }

    const getBreadcrumbText = (breadcrumb) => {
        console.log("breadcrumb in getText", breadcrumb);
        if (breadcrumb.props.children !== undefined) {
            return breadcrumb.props.children;
        }

        const driver = drivers.filter(driver => driver.Driver.driverId === breadcrumb.props.match.params.id)[0];
        if (driver !== undefined) {
            // console.log("driver", driver);
            return `${driver.Driver.givenName} ${driver.Driver.familyName}`;
        }

        const team = teams.filter(team => team.Constructor.constructorId === breadcrumb.props.match.params.id)[0];
        if (team !== undefined) {
            // console.log("team", team);
            return team.Constructor.name;
        }

        return "Not defined";
    }

    return (
        <div>
            {breadcrumbs.map(({ match, breadcrumb, location }) => 
                <Link key={match.pathname} to={match.pathname} state={location.state}>
                    <input type="button" value={getBreadcrumbText(breadcrumb)} />
                </Link>
            )}
        </div>
    );
}

export default Breadcrumbs;