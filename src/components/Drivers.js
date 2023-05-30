import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Flag from "react-flagkit";
import { FadeLoader } from "react-spinners";

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [flagsDetails, setFlagsDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getDrivers();
    }, []);

    const getDrivers = async () => {
        // const url = `http://ergast.com/api/f1/2013/driverStandings.json`;
        const url = `https://raw.githubusercontent.com/nkezic/f1/main/AllDrivers`;
        const urlFlags = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
        const response = await axios.get(url);
        const responseFlags = await axios.get(urlFlags);
        console.log("New response", response.data);

        setDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setFlagsDetails(responseFlags.data);
        // console.log(responseFlags.data);
        setLoading(false);
        // console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
    }

    const handleClickDetails = (id, nationalityCode) => {
        const linkTo = `/drivers/${id}`;
        navigate(linkTo, { state: { nationalityCode: nationalityCode, flagsDetails: flagsDetails} });
    }

    const getFlag = (driverNationality) => {
        // console.log(driverDetails.nationality);

        let nationality = "";

        if (driverNationality === "British") {
            nationality = "British, UK";
        } else if (driverNationality === "Dutch") {
            nationality = "Dutch, Netherlandic";
        } else {
            nationality = driverNationality;
        }

        const flag = flagsDetails.find(item => item.nationality === nationality);
        
        return flag.alpha_2_code;
    }

    if(loading) {
        return (
            <FadeLoader size={75} color="red" />
        );
    }

    return (
        <div className="container">
            <h1>Drivers Championships</h1>
            <div className="header">Drivers Championships Standings - 2013</div>
            <table className="custom-table">
                <tbody>
                    {drivers.map(driver =>
                        <tr key={driver.Driver.driverId}>
                            <td>{driver.position}</td>
                            <td className="pointer" onClick={() => handleClickDetails(driver.Driver.driverId, getFlag(driver.Driver.nationality))}>
                                <Flag country={getFlag(driver.Driver.nationality)} />
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