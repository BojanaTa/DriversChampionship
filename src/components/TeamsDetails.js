import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

const TeamsDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [races, setRaces] = useState([]);

  useEffect(() => {
      getRaceResults(id);
  }, [id, location.state]);

  const getRaceResults = async (id) => {
    const url = `https://ergast.com/api/f1/2013/constructors/${id}/results.json`;
    try {
      const response = await axios.get(url);
      const raceData = response.data?.MRData?.RaceTable?.Races;
      setRaces(raceData);
    }
    catch (error) {
      console.error(`Error retrieving race results for:`, error);
    }
  };

  return (
    <div>
        <div>
          <h2>Race Results for</h2>
          <table>
            <thead>
              <tr>
                <th>Round</th>
                <th>Grand Prix</th>
                <th>Name</th>
                <th>Name</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {races.map((race, index) => (
                <tr key={index}>
                  <td>{race.raceName}</td>
                  <td>{race.Results[0].grid}</td>
                  <td>{race.Results[0].position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default TeamsDetails;



