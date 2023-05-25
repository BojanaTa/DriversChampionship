import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Races = () => {
    const [races, setRaces] = useState([]);
    const navigate = useNavigate();



    useEffect(() => {
        getRaces();
    }, []);

    const getRaces = async () => {

        const url = "https://ergast.com/api/f1/2013/results/1.json";
        const response = await axios.get(url);
        console.log(response.data);
        console.log(response.data.MRData.RaceTable.Races);
        setRaces(response.data.MRData.RaceTable.Races);
        //console.log("details", response.data.MRData.RaceTable);

    }

    const handleClickRacesDetails = (id) => {
        // console.log(id);
        const linkTo = `/raceDetails/${id}`;
        navigate(linkTo);
    }

    return (
        <div>
            <h1>Race Calendar</h1>
            <div>Race Calendar - 2013</div>
            <table>
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
                        <tr>
                            <td>{race.round}</td>
                            <td onClick={() => handleClickRacesDetails()}>{race.raceName}</td>
                            <td>{race.Circuit.circuitName}</td>
                            <td>{race.date}</td>
                            <td>{race.Results[0].Driver.familyName}</td>
                        </tr>

                    )}

                </tbody>
            </table>
        </div>
    );
}

export default Races;
