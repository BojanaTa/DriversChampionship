import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTeams();
  }, []);

  const getTeams = async () => {
    const url = "http://ergast.com/api/f1/2013/constructorStandings.json";
    try {
      const response = await axios.get(url);
      setTeams(response.data.MRData.StandingsTable.StandingsLists[0]
        .ConstructorStandings);
      console.log("Response details", response.data);
    } catch (error) {
      console.error("Error retrieving teams:", error);
    }
  };

  const handleClickTeam = async (id) => {
    navigate(`/teams/${id}`);
  };

  return (
    <div className="container">
      <h1>Teams</h1>
      <div className="header">Constructor Championships Standings - 2013</div>
      <table className="custom-table">
        <tbody>
          {teams.map((team) => (
            <tr key={team.Constructor.constructorId}>
              <td>{team.position}</td>
              <td className="pointer"
                onClick={() =>
                  handleClickTeam(
                    team.Constructor.constructorId
                  )
                }
              >
                {team.Constructor.name}
              </td>
              <td>Details <Link to={team.Constructor.url} target="_blank"><img src="/images/link-black.png" color="red" className="link-btn" alt="Wikipedia information about team" /></Link></td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Teams;















