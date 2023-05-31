import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import axios from "axios";
import { DataContext } from "../App";

const Breadcrumbs = ({ routes }) => {
    const breadcrumbs = useBreadcrumbs(routes);
    const dataContext = useContext(DataContext);

    const getBreadcrumbText = (breadcrumb) => {
        //console.log("breadcrumb in getText", breadcrumb);
        if (breadcrumb.props.children !== undefined) {
            return breadcrumb.props.children;
        }

        const driver = dataContext.drivers.filter(driver => driver.Driver.driverId === breadcrumb.props.match.params.id)[0];
        if (driver !== undefined) {
            // console.log("driver", driver);
            return `${driver.Driver.givenName} ${driver.Driver.familyName}`;
        }

        const team = dataContext.teams.filter(team => team.Constructor.constructorId === breadcrumb.props.match.params.id)[0];
        if (team !== undefined) {
            // console.log("team", team);
            return team.Constructor.name;
        }

        return "Not defined";
    }

    return (
        <div className="breadcrumbs">
            {breadcrumbs.map(({ match, breadcrumb, location }) => 
                <Link key={match.pathname} to={match.pathname} state={location.state}>
                    <input type="button" value={getBreadcrumbText(breadcrumb)} />
                </Link>
            )}
        </div>
    );
}

export default Breadcrumbs;