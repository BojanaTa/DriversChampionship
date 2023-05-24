import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Flag from "react-flagkit";
import { FadeLoader } from "react-spinners";

const DriversDetails = () => {
    const [driverDetails, setDriverDetails] = useState({});
    const [constructorDetails, setConstructorDetails] = useState({});
    const [racesDetails, setRacesDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const id = params.id;
    const location = useLocation();
    const nationalityCode = location.state.nationalityCode;
   
   

    useEffect(() => {
        getDriverDetails();
        // eslint-disable-next-line
    }, []);

    const getDriverDetails = async () => {
        const url = `https://ergast.com/api/f1/2013/drivers/${id}/driverStandings.json`;
        const urlRaces = `http://ergast.com/api/f1/2013/drivers/${id}/results.json`;
        const response = await axios.get(url);
        const responseRaces = await axios.get(urlRaces);
        console.log(response.data);
        setDriverDetails(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver);
        setConstructorDetails(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Constructors[0]);
        setRacesDetails(responseRaces.data.MRData.RaceTable.Races);
        setLoading(false);
        // console.log("driver", response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Constructors[0].name);
        // setLoading(false);
    }

    const getColor = (position) => {
        console.log(position);
        switch(position) {
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


    if(loading) {
        return (
            <FadeLoader size={75} color="red" />
        );
    }

    return (
        <div>
            <div className="driver-details">
                <div>
                    <img src={`/images/${driverDetails.driverId}.jpg`} alt="Drivers Logo" />
                </div>
                <Flag country={nationalityCode} />
                <p>{driverDetails.givenName} {driverDetails.familyName}</p>
                <p>Country: {driverDetails.nationality}</p>
                <p>Team: {constructorDetails.name}</p>
                <p>Birth: {driverDetails.dateOfBirth}</p>
                <p>Biography:</p>
                <div>
                <Link to={driverDetails.url}><img src="/images/link-white.png" alt="Drivers Logo" /></Link>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Round</th>
                        <th>Grand Prix</th>
                        <th>Team</th>
                        <th>Grid</th>
                        <th>Race</th>
                    </tr>
                </thead>
                <tbody>
                    {racesDetails.map((race, i) =>
                        <tr key={i}>
                            <td>{race.round}</td>
                            <td>
        
                                {race.raceName}
                            </td>
                            <td>{race.Results[0].Constructor.name}</td>
                            <td>{race.Results[0].grid}</td>
                            <td style={{backgroundColor: getColor(race.Results[0].position)}}>
                                {race.Results[0].position}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

    );
}

export default DriversDetails;