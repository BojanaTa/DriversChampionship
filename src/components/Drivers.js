import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Flag from "react-flagkit";
import { getFlagByNationality } from "../helpers/FlagHelper";
import { DataContext } from "../contexts/GetDataContext";
import { SeasonContext } from "./Seasons";
import { FadeLoader } from "react-spinners";

const Drivers = () => {
    const navigate = useNavigate();
    const dataContext = useContext(DataContext).contextValue;
    const season = useContext(SeasonContext).season;

    console.log("isDataLoading", dataContext.isDataLoading);

    const handleClickDetails = (id) => {
        const linkTo = `/drivers/${id}`;
        navigate(linkTo);
    }

    return (
        <div className="container">
            <h1>Drivers Championships</h1>
            <div className="header">{`Drivers Championships Standings - ${season}`}</div>
            <table className="custom-table">
                <tbody>
                    {dataContext.drivers?.map(driver =>
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
            <div className="footer"></div>
        </div>
    );
}

export default Drivers;