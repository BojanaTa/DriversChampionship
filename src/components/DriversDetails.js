import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Flag from "react-flagkit";
import { FadeLoader } from "react-spinners";
import { getFlagByCountry, getFlagByNationality } from "../helpers/FlagHelper";
import { DataContext } from "../contexts/GetDataContext";
import { getColor } from "../helpers/Helper";
import { SeasonContext } from "./Seasons";

const DriversDetails = () => {
    const [driverDetails, setDriverDetails] = useState({});
    const [racesDetails, setRacesDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const id = params.id;
    const dataContext = useContext(DataContext).contextValue;
    const selectedSeason = useContext(SeasonContext).season;
   
    useEffect(() => {
        getDriverDetails();
        // eslint-disable-next-line
    }, [driverDetails]);

    const getDriverDetails = async () => {
        const url = `http://ergast.com/api/f1/${selectedSeason}/drivers/${id}/driverStandings.json`;
        // const url = `https://raw.githubusercontent.com/nkezic/f1/main/DriverDetails`;
        const urlRaces = `http://ergast.com/api/f1/${selectedSeason}/drivers/${id}/results.json`;
        // const urlRaces = "https://raw.githubusercontent.com/nkezic/f1/main/DriverRaces";
        const response = await axios.get(url);
        const responseRaces = await axios.get(urlRaces);
        setDriverDetails(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
        setRacesDetails(responseRaces.data.MRData.RaceTable.Races);
        setLoading(false);
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
                <div className="header">{`Formula 1 ${selectedSeason} Results`}</div>
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
                <div className="footer"></div>
            </div>
        </div>

    );
}

export default DriversDetails;