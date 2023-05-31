import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Flag from "react-flagkit";
import { FadeLoader } from "react-spinners";
import { getFlagByCountry, getFlagByNationality } from "../helpers/FlagHelper";
import { DataContext } from "../App";

const DriversDetails = () => {
    const [driverDetails, setDriverDetails] = useState({});
    const [racesDetails, setRacesDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const id = params.id;
    const dataContext = useContext(DataContext);

    // console.log("DriversDetails dataContext", dataContext);
   
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
                            <td> <Flag country={getFlagByNationality(driverDetails.Driver.nationality, dataContext.flagsDetails)} />
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
                                    <Flag country={getFlagByCountry(race.Circuit.Location.country, dataContext.flagsDetails)} />
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