import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DriversDetails = () => {
    const [driverDetails, setDriverDetails] = useState({});
    const [racesDetails, setRacesDetails] = useState([]);
    const params = useParams();

    useEffect(() => {
        getDriverDetails();
        // eslint-disable-next-line
    }, []);

    const getDriverDetails = async () => {
        // console.log(params);
        const id = params.id;
        const url = `https://ergast.com/api/f1/2013/drivers/${id}/driverStandings.json`;
        const urlRaces = `http://ergast.com/api/f1/2013/drivers/${id}/results.json`;
        // console.log(url);
        const response = await axios.get(url);
        const responseRaces = await axios.get(urlRaces);
        // console.log(responseRaces.data);
        // console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver);
        setDriverDetails(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver);
        setRacesDetails(responseRaces.data.MRData.RaceTable.Races);
        // console.log("state", racesDetails);
        console.log(responseRaces.data.MRData.RaceTable.Races);
        // setLoading(false);
    }

    return (
        <div>
            <div className="driver-details">
                <p>Drivers details</p>
                <p>{driverDetails.familyName}</p>
                <div>
                {/* <img src="../images/link-black.png"></img>  */}
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {racesDetails.map((race, i) =>
                        <tr key={i}>
                            <td>{race.raceName}</td>
                            <td>{race.Results[0].grid}</td>
                            <td>{race.Results[0].position}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

    );
}

export default DriversDetails;