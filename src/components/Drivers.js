import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Flag from "react-flagkit";
import { DataContext } from "../App";
import { getFlagByNationality } from "../helpers/FlagHelper";

const Drivers = () => {
    const navigate = useNavigate();
    const dataContext = useContext(DataContext);

    console.log("Drivers dataContext", dataContext);

    const handleClickDetails = (id) => {
        const linkTo = `/drivers/${id}`;
        navigate(linkTo);
    }

    return (
        <div className="container">
            <h1>Drivers Championships</h1>
            <div className="header">Drivers Championships Standings - 2013</div>
            <table className="custom-table">
                <tbody>
                    {dataContext.drivers.map(driver =>
                        <tr key={driver.Driver.driverId}>
                            <td>{driver.position}</td>
                            <td className="pointer"
                                onClick={() =>
                                    handleClickDetails(driver.Driver.driverId)}>
                                <Flag
                                    country={getFlagByNationality(driver.Driver.nationality, dataContext.flagsDetails)} />
                                {driver.Driver.givenName} {driver.Driver.familyName}
                            </td>
                            <td>{driver.Constructors[0].name}</td>
                            <td>{driver.points}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Drivers;