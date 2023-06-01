import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { DataContext } from "../contexts/GetDataContext";

const Breadcrumbs = ({ routes }) => {
    const breadcrumbs = useBreadcrumbs(routes);
    const dataContext = useContext(DataContext).contextValue;

    const getBreadcrumbText = (breadcrumb) => {
        if (breadcrumb.props.children !== undefined) {
            return breadcrumb.props.children;
        }

        const driver = dataContext.drivers?.filter(driver => driver.Driver.driverId === breadcrumb.props.match.params.id)[0];
        if (driver !== undefined) {
            return `${driver.Driver.givenName} ${driver.Driver.familyName}`;
        }

        const team = dataContext.teams?.filter(team => team.Constructor.constructorId === breadcrumb.props.match.params.id)[0];
        if (team !== undefined) {
            return team.Constructor.name;
        }

        return "Not defined";
    }

    return (
        <div className="breadcrumbs">
            {breadcrumbs.map(({ match, breadcrumb }) => 
                <Link key={match.pathname} to={match.pathname}>
                    <input className="breadcrumbs-input" type="button" value={getBreadcrumbText(breadcrumb)} />
                </Link>
            )}
        </div>
    );
}

export default Breadcrumbs;