import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Flag from "react-flagkit";
import { FadeLoader } from "react-spinners";

const DriversDetails = () => {
    const [driverDetails, setDriverDetails] = useState({});
    const [racesDetails, setRacesDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const id = params.id;
    const location = useLocation();
    const nationalityCode = location.state.nationalityCode;
    const flagsDetails = location.state.flagsDetails;

    useEffect(() => {
        getDriverDetails();
        // eslint-disable-next-line
    }, []);

    const getDriverDetails = async () => {
        //const url = `http://ergast.com/api/f1/2013/drivers/${id}/driverStandings.json`;
        const url = `https://raw.githubusercontent.com/nkezic/f1/main/DriverDetails`;
        //const urlRaces = `http://ergast.com/api/f1/2013/drivers/${id}/results.json`;
        const urlRaces = "https://raw.githubusercontent.com/nkezic/f1/main/DriverRaces";
        const response = await axios.get(url);
        const responseRaces = await axios.get(urlRaces);
        setDriverDetails(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
        setRacesDetails(responseRaces.data.MRData.RaceTable.Races);
        setLoading(false);
    }

    const getColor = (position) => {
        ///console.log(position);
        switch (position) {
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

    const getFlag = (raceCountry) => {
        let country = "";

        if (raceCountry === "UK") {
            country = "United Kingdom of Great Britain and Northern Ireland";
        } else if (raceCountry === "Korea") {
            country = "Korea (Republic of)";
        } else if (raceCountry === "UAE") {
            country = "Saudi Arabia";
        } else if (raceCountry === "USA") {
            country = "United States of America";
        } else {
            country = raceCountry;
        }

        const flag = flagsDetails.find(item => item.en_short_name === country);

        // console.log(flag);
        // if (flag === undefined){
        //     console.log(country);
        // }

        return flag.alpha_2_code;
    }



    if (loading) {
        return (
            <FadeLoader size={75} color="red" />
        );
    }

    return (
        <div className="wrap">
            <div className="driver-details">
                <table className="driver">
                    <thead>
                        <tr>
                            <td><img src={`/images/${driverDetails.Driver.driverId}.jpg`} alt="Drivers Logo" /></td>
                            <td> <Flag country={nationalityCode} />
                                <p>{driverDetails.Driver.givenName}</p>
                                <p>{driverDetails.Driver.familyName}</p>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Country: </td>
                            <td>{driverDetails.Driver.nationality}</td>
                        </tr>
                        <tr>
                            <td>Team: </td>
                            <td>{driverDetails.Constructors[0].name}</td>
                        </tr>
                        <tr>
                            <td>Birth: </td>
                            <td>{driverDetails.Driver.dateOfBirth}</td>
                        </tr>
                        <tr>
                            <td>Biography: </td>
                            <td>
                                <Link to={driverDetails.Driver.url} target="_blank"><img src="/images/link-white.png" alt="Drivers Logo" className="link-btn" /></Link>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <div className="container">
                <div className="header">Formula 1 2013 Results</div>
                <table className="custom-table">
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
                        {racesDetails.map(race =>
                            <tr key={race.round}>
                                <td>{race.round}</td>
                                <td>
                                    <Flag country={getFlag(race.Circuit.Location.country)} />
                                    {race.raceName}
                                </td>
                                <td>{race.Results[0].Constructor.name}</td>
                                <td>{race.Results[0].grid}</td>
                                <td style={{ backgroundColor: getColor(race.Results[0].position) }}>
                                    {race.Results[0].position}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default DriversDetails;