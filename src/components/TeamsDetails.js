import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Flag from "react-flagkit";
import Loader from "./Loader";

const TeamsDetails = () => {
  const { id } = useParams();
  const [teams, setTeams] = useState([]);
  const [races, setRaces] = useState([]);
  const [raceDetails, setRaceDetails] = useState([]);
  const [flagsDetails, setFlagsDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRaceResults = async (id) => {
    const urlTeams = //`http://ergast.com/api/f1/2013/constructors/${id}/constructorStandings.json`;
      "https://raw.githubusercontent.com/nkezic/f1/main/TeamDetails";

    const url = //`https://ergast.com/api/f1/2013/constructors/${id}/results.json`;
      "https://raw.githubusercontent.com/nkezic/f1/main/TeamResults";
    const urlFlags = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
    try {
      const responseTeams = await axios.get(urlTeams);
      const response = await axios.get(url);
      const responseFlags = await axios.get(urlFlags);
      const teams = responseTeams.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
      //console.log("Teams", teams);
      setTeams(teams);
      const raceData = response.data.MRData.RaceTable.Races;
      //console.log("Race Data:", raceData);
      setRaces(raceData);
      setRaceDetails(response.data.MRData.RaceTable.Races[0].Results);
      setFlagsDetails(responseFlags.data);
      setLoading(false);
    } catch (error) {
      console.error(`Error retrieving race results:`, error);
      setLoading(false);
    }
  };

  const getColor = (position) => {
    switch (position) {
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

    const flag = flagsDetails.find((item) => item.en_short_name === country);

    return flag.alpha_2_code;
  };

  const getFlag2 = (driverNationality) => {

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




  useEffect(() => {
    getRaceResults(id);
    // eslint-disable-next-line
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
              <td><img src={`/images/${raceDetails[0].Constructor.constructorId}.png`} alt="Teams Logo" /></td>
              <td>
                <Flag country={getFlag2(raceDetails[0].Constructor.nationality)} />
                <p>{raceDetails[0].Constructor.name}</p>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Country: </td>
              <td>{raceDetails[0].Driver?.nationality}</td>
            </tr>
            <tr>
              <td>Position: </td>
              <td>{raceDetails[0].position}</td>
            </tr>
            <tr>
              <td>Points: </td>
              <td>{raceDetails[0].points}</td>
            </tr>
            <tr>
              <td>History: </td>
              <td>
                {teams.length > 0 && (
                  <Link
                    to={teams[0].Constructor.url}
                    target="_blank"
                  >
                    <img
                      src="/images/link-white.png"
                      alt="Teams Logo"
                      className="link-btn"
                    />
                  </Link>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container">
        <div className="header">Race Results for</div>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Round</th>
              <th>Grand Prix</th>
              {raceDetails.map((result, index) => (
                <th key={index}>{result.Driver.familyName}</th>
              ))}
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {races.map((race, index) => (
              <tr key={index}>
                <td>{race?.round}</td>
                <td>
                  <Flag
                    country={getFlag(race.Circuit.Location.country)}
                  />
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
                  {parseInt(race.Results[0].points) +
                    parseInt(race.Results[1].points)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamsDetails;


