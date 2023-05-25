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
                    <td key={index}>{result.position}</td>
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


