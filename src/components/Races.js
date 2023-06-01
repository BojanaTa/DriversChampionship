import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Flag from "react-flagkit";
import { DataContext } from "../App";
import { getFlagByCountry, getFlagByNationality } from "../helpers/FlagHelper";

const Races = () => {
    const navigate = useNavigate();
    const dataContext = useContext(DataContext);
    console.log("Races dataContext", dataContext);

    const handleClickRacesDetails = (id) => {
        const linkTo = `/races/${id}`;
        navigate(linkTo);
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
                    {dataContext.races.map(race =>
                         <tr key={race.round}>
                            <td>{race.round}</td>
                            <td className="pointer" onClick={() => handleClickRacesDetails(race.round)}>
                            <Flag country={getFlagByCountry(race.Circuit.Location.country, dataContext.flagsDetails)} />
                                {race.raceName}</td>
                            <td>{race.Circuit.circuitName}</td>
                            <td>{race.date}</td>
                            <td>
                            <Flag
                                    country={getFlagByNationality(race.Results[0].Driver.nationality, dataContext.flagsDetails)} />
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
