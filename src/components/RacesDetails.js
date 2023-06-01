import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Flag from "react-flagkit";
import Loader from "./Loader";
import { getFlagByCountry, getFlagByNationality } from "../helpers/FlagHelper";
import { DataContext } from "../App";



const RacesDetails = () => {
    const [qualifiersResults, setQualifiersResults] = useState([]);
    const [results, setResults] = useState([]);
    //const [flagsDetails, setFlagsDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const id = params.id;
    const dataContext = useContext(DataContext);




    const getResults = async () => {
        const urlQualifiers = `https://ergast.com/api/f1/2013/${id}/qualifying.json`;
        // const urlQualifiers = `https://raw.githubusercontent.com/nkezic/f1/main/Qualifiers`;
        const urlResults = `https://ergast.com/api/f1/2013/${id}/results.json`;
        // const urlResults = `https://raw.githubusercontent.com/nkezic/f1/main/Qualifiers`;
        const urlFlags = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
        try {
            const responseQualifiers = await axios.get(urlQualifiers);
            const responseResults = await axios.get(urlResults);
            const responseFlags = await axios.get(urlFlags);
            console.log("qualifiers", responseQualifiers.data.MRData.RaceTable.Races[0]);
            console.log("results", responseResults.data.MRData.RaceTable.Races[0].Results);


            setQualifiersResults(responseQualifiers.data.MRData.RaceTable.Races[0]);
            setResults(responseResults.data.MRData.RaceTable.Races[0].Results);
            //setFlagsDetails(responseFlags.data);
            setLoading(false);
        } catch (error) {
            console.error(`Error retrieving race results:`, error);
            setLoading(false);
        }
    }

    const getColor = (points) => {
        switch (points) {
            case "1":
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
    };

    const getBestTime = (result) => {
        if (result.Q3) {
            return result.Q3;
        } else if (result.Q2) {
            return result.Q2;
        } else if (result.Q1) {
            return result.Q1;
        } else {
            return "";
        }
    };

    useEffect(() => {
        getResults();
        //eslint-disable-next-line

    }, []);

    if (loading) {
        return (
            <Loader />
        );
    }


    return (
        <div className="wrap">
            <div className="driver-details">
                <table className="driver">
                    <thead>
                        <tr>
                            <td>
                                <Flag country={getFlagByCountry(qualifiersResults.Circuit.Location.country, dataContext.flagsDetails)} />

                                <p>{qualifiersResults.raceName}</p>
                            </td>
                        </tr>
                    </thead>
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
                                <td style={{backgroundColor: getColor(result.points)}}>
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