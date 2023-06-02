import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Flag from "react-flagkit";
import { getFlagByCountry, getFlagByNationality } from "../helpers/FlagHelper";
import Loader from "./Loader";
import { DataContext } from "../contexts/GetDataContext";
import { SeasonContext } from "./Seasons";
import { getColor } from "../helpers/Helper";

const TeamsDetails = () => {
  const { id } = useParams();
  const [teams, setTeams] = useState([]);
  const [raceData, setRaceData] = useState([]);
  const dataContext = useContext(DataContext).contextValue;
  const [loading, setLoading] = useState(true);
  const season = useContext(SeasonContext).season;

  const getRaceResults = async (id) => {
    const urlTeams = `https://ergast.com/api/f1/${season}/constructors/${id}/constructorStandings.json`;
    const url = `https://ergast.com/api/f1/${season}/constructors/${id}/results.json`;
    try {
      const responseTeams = await axios.get(urlTeams);
      const response = await axios.get(url);
      setTeams(responseTeams.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
      setRaceData(response.data.MRData.RaceTable.Races);
      setLoading(false);
    } catch (error) {
      console.error(`Error retrieving race results:`, error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getRaceResults(id);
    // eslint-disable-next-line
  }, [raceData]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="wrap">
      <div className="driver-details">
        <table className="driver">
          <thead>
            <tr>
              <td>
                <img src={`/images/${raceData[0].Results[0].Constructor.constructorId}.png`} alt="Teams Logo" />
              </td>
              <td>
                <Flag country={getFlagByNationality(raceData[0].Results[0].Constructor.nationality, dataContext.flagsDetails)} />
                <p>{raceData[0].Results[0].Constructor.name}</p>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Country: </td>
              <td>{raceData[0].Results[0].Driver.nationality}</td>
            </tr>
            <tr>
              <td>Position: </td>
              <td>{raceData[0].Results[0].position}</td>
            </tr>
            <tr>
              <td>Points: </td>
              <td>{raceData[0].Results[0].points}</td>
            </tr>
            <tr>
              <td>History: </td>
              <td>
                {teams.length > 0 && (
                  <Link to={teams[0].Constructor.url} target="_blank">
                    <img src="/images/link-white.png" alt="Teams Logo" className="link-btn" />
                  </Link>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container">
        <div className="header">{`Formula 1 ${season} Results`}</div>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Round</th>
              <th>Grand Prix</th>
              {raceData[0].Results.map((result, index) => (
                <th key={index}>{result.Driver.familyName}</th>
              ))}
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {raceData.map((race, index) => (
              <tr key={index}>
                <td>{race.round}</td>
                <td>
                  <Flag country={getFlagByCountry(race.Circuit.Location.country, dataContext.flagsDetails)} />
                  {race.raceName}
                </td>
                {race.Results.map((result, index) => (
                  <td
                    key={index}
                    style={{
                      backgroundColor: getColor(result.position),
                    }}
                  >
                    {result.position}
                  </td>
                ))}
                <td>
                  {parseInt(race.Results[0].points || 0) + parseInt(race.Results[1].points || 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="footer"></div>
      </div>
    </div>
  );
};

export default TeamsDetails;
