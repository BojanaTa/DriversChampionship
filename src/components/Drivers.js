import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getDrivers();
    }, []);

    const getDrivers = async () => {

        const url = "https://ergast.com/api/f1/2013/driverStandings.json";
        const response = await axios.get(url);
        console.log(response.data);

        setDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
    }

    const handleClickDetails = (id) => {
        // console.log(id);
        const linkTo = `/details/${id}`;
        navigate(linkTo);
    }

    return (
        <div className="container">
            <h1>Drivers Championships</h1>
            <table className="custom-table">
                <thead>
                        <tr>
                            <td>Drivers Championships Standings - 2013</td>
                        </tr>
                </thead>
                <tbody>
                    {drivers.map(driver =>
                        <tr key={driver.Driver.driverId}>
                            <td>{driver.position}</td>
                            <td onClick={() => handleClickDetails(driver.Driver.driverId)}>
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