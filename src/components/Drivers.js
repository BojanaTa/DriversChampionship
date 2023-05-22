import React, { useEffect, useState } from "react";
import axios from "axios";

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);

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

    
    return (
        <div>
            <h1>Drivers</h1>
             <table>
                <thead>
                    <tr>
                        <th>Drivers Championships Standings - 2013</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.map((driver,i) =>
                        <tr key={i}>
                            <td>{driver.position}</td>
                            <td>{driver.Driver.givenName} {driver.Driver.familyName}</td>
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