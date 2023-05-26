import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TeamsDetails = () => {
  const { id } = useParams();
  const [races, setRaces] = useState([]);
  const [raceDetails, setRaceDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getRaceResults = async (id) => {
    const url = `https://ergast.com/api/f1/2013/constructors/${id}/results.json`;
    try {
      const response = await axios.get(url);
      const raceData = response.data.MRData.RaceTable.Races;
      console.log("Race Data:", raceData);
      setRaces(raceData);
      setRaceDetails(response.data.MRData.RaceTable.Races[0].Results);
      setIsLoading(false);
    } catch (error) {
      console.error(`Error retrieving race results:`, error);
      setIsLoading(false);
    }
  };

  const getColor = (position) => {
    console.log(position);
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


  useEffect(() => {
    getRaceResults(id);
  }, [id]);

  console.log("Race Details:", raceDetails);
  console.log("isLoading:", isLoading);


  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Race Results for </h2>
          <table>
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
                  <td>{race.round}</td>
                  <td>{race.raceName}</td>
                  {race.Results.map((result, index) => (
                    <td key={index} style={{ backgroundColor: getColor(result.position) }}>{result.position}</td>
                  ))}
                  <td>{race.Results[0].points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TeamsDetails;



