import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Flag from "react-flagkit";
import { FadeLoader } from "react-spinners";





const Races = () => {
    const [races, setRaces] = useState([]);
    const [flagsDetails, setFlagsDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();




    useEffect(() => {
        getRaces();
    }, []);

    const getRaces = async () => {

        //const url = "https://ergast.com/api/f1/2013/results/1.json";
        const url = "https://raw.githubusercontent.com/nkezic/f1/main/AllRaces";
        const urlFlags = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
        const response = await axios.get(url);
        const responseFlags = await axios.get(urlFlags);
        console.log(response.data);

        setRaces(response.data.MRData.RaceTable.Races);
        //console.log("details", response.data.MRData.RaceTable);
        setFlagsDetails(responseFlags.data);
        setLoading(false);
    }

    const handleClickRacesDetails = (id) => {
        // console.log(id);
        const linkTo = `/races/${id}`;
        navigate(linkTo);
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

    const getFlag2 = (driverNationality) => {
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




    if (loading) {
        return (
            <FadeLoader size={75} color="red" />
        );
    }

    return (
        <div className="container">
            <h1>Race Calendar</h1>
            <div className="header">Race Calendar - 2013</div>
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>Round</th>
                        <th>Grand Prix</th>
                        <th>Circuit</th>
                        <th>Date</th>
                        <th>Winner</th>
                    </tr>
                </thead>
                <tbody>
                    {races.map(race =>
                        /*pitati za key*/ <tr key={race.round}>
                            <td>{race.round}</td>
                            <td className="pointer" onClick={() => handleClickRacesDetails(race.round)}>
                                <Flag country={getFlag(race.Circuit.Location.country)} />
                                {race.raceName}</td>
                            <td>{race.Circuit.circuitName}</td>
                            <td>{race.date}</td>
                            <td>
                                <Flag country={getFlag2(race.Results[0].Driver.nationality)} />
                                {race.Results[0].Driver.givenName}
                                {race.Results[0].Driver.familyName}
                            </td>
                        </tr>

                    )}

                </tbody>
            </table>
        </div>
    );
}

export default Races;
