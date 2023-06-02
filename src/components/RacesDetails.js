import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Flag from "react-flagkit";
import Loader from "./Loader";
import { getFlagByCountry, getFlagByNationality } from "../helpers/FlagHelper";
import { DataContext } from "../contexts/GetDataContext";
import { getColor } from "../helpers/Helper";
import { SeasonContext } from "./Seasons";

const RacesDetails = () => {
    const [qualifiersResults, setQualifiersResults] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const id = params.id;
    const dataContext = useContext(DataContext).contextValue;
    const season = useContext(SeasonContext).season;

    const getResults = async () => {
        const urlQualifiers = `https://ergast.com/api/f1/${season}/${id}/qualifying.json`;
        const urlResults = `https://ergast.com/api/f1/${season}/${id}/results.json`;
        try {
            const responseQualifiers = await axios.get(urlQualifiers);
            const responseResults = await axios.get(urlResults);
            setQualifiersResults(responseQualifiers.data.MRData.RaceTable.Races[0]);
            setResults(responseResults.data.MRData.RaceTable.Races[0].Results);
            setLoading(false);
        } catch (error) {
            console.error(`Error retrieving race results:`, error);
            setLoading(false);
        }
    }

    const getBestTime = (result) => {
        const times = [result.Q3, result.Q2, result.Q1]
        times.sort();
        return times.length > 0 ? times[0] : "";
    }


    useEffect(() => {
        getResults();
        // eslint-disable-next-line
    }, [qualifiersResults]);

    if (loading) {
        return (
            <Loader />
        );
    }

    if(qualifiersResults === undefined) {
        return (
            <div className="container">
                <h1>{`Qualifying Results are not available for year ${season}`}</h1>
            </div>
        );
    }

    return (
        <div className="wrap">
            <div className="races-details">
                <div className="details-header">
                    <Flag country={getFlagByCountry(qualifiersResults.Circuit.Location.country, dataContext.flagsDetails)} />
                    <p>{qualifiersResults.raceName}</p>
                </div>
                <table className="driver">
                    <tbody>
                        <tr>
                            <td>Country: </td>
                            <td>{qualifiersResults.Circuit.Location.country}</td>
                        </tr>
                        <tr>
                            <td>Location: </td>
                            <td>{qualifiersResults.Circuit.Location.locality}</td>
                        </tr>
                        <tr>
                            <td>Date: </td>
                            <td>{qualifiersResults.date}</td>
                        </tr>
                        <tr>
                            <td>Full Report: </td>
                            <td><Link to={qualifiersResults.url} target="_blank"><img src="/images/link-white.png" alt="Drivers Logo" className="link-btn" /></Link>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <div className="container">
                <div className="header">Qualifying Results</div>

                <table className="custom-table">
                    <thead>
                        <tr>
                            <td>Pos</td>
                            <td>Driver</td>
                            <td>Team</td>
                            <td>Best Time</td>

                        </tr>
                    </thead>
                    <tbody>
                        {qualifiersResults.QualifyingResults.map((result, i) =>
                            <tr key={i}>
                                <td>{result.position}</td>
                                <td>
                                    <Flag country={getFlagByNationality(result.Driver.nationality, dataContext.flagsDetails)} />
                                    {result.Driver.familyName}
                                </td>
                                <td>{result.Constructor.name}</td>
                                <td>{getBestTime(result)}</td>

                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="footer"></div>
            </div>

            <div className="container">
                <div className="header">Race Results</div>
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Pos</th>
                            <th>Driver</th>
                            <th>Team</th>
                            <th>Result</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, i) =>
                            <tr key={i}>
                                <td>{result.position}</td>
                                <td>
                                    <Flag country={getFlagByNationality(result.Driver.nationality, dataContext.flagsDetails)} />
                                    {result.Driver.familyName}
                                </td>
                                <td>{result.Constructor.name}</td>
                                <td>{result.Time !== undefined ? result.Time.time : ""}</td>
                                <td style={{ backgroundColor: getColor(result.points) }}>
                                    {result.points}
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

export default RacesDetails;