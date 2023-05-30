import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Flag from "react-flagkit";
import { FadeLoader } from "react-spinners";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [flagsDetails, setFlagsDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getTeams();
    getFlagsDetails();
  }, []);

  const getTeams = async () => {
    const url = //"http://ergast.com/api/f1/2013/constructorStandings.json";
    "https://raw.githubusercontent.com/nkezic/f1/main/AllTeams";
    try {
      const response = await axios.get(url);
      console.log(response.data);
      setTeams(
        response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
      );
      setLoading(false);
    } catch (error) {
      console.error("Error retrieving teams:", error);
    }
  };

  const getFlagsDetails = async () => {
    const urlFlags =
      "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
    try {
      const responseFlags = await axios.get(urlFlags);
      console.log(responseFlags.data)
      setFlagsDetails(responseFlags.data);
    } catch (error) {
      console.error("Error retrieving flags details:", error);
    }
  };

  const getFlag = (driverNationality) => {
    let nationality = "";

    if (driverNationality === "British") {
      nationality = "British, UK";
    } else if (driverNationality === "Dutch") {
      nationality = "Dutch, Netherlandic";
    } else {
      nationality = driverNationality;
    }

    const flag = flagsDetails.find((item) => item.nationality === nationality);
    return flag ? flag.alpha_2_code : "";
  };

  const handleClickTeams = (id) => {
    const linkTo = `/teams/${id}`;
    navigate(linkTo);
  };

  if (loading) {
    return (
      <FadeLoader size={75} color="red" />
    );
  }

  return (
    <div className="container">
      <h1>Teams</h1>
      <div className="header">Constructor Championships Standings - 2013</div>
      <table className="custom-table">
        <tbody>
          {teams.map((team) => (
            <tr key={team.Constructor.constructorId}>
              <td>{team.position}</td>
              <td
                className="pointer"
                onClick={() => handleClickTeams(team.Constructor.constructorId)}
              >
                <Flag country={getFlag(team.Constructor.nationality)} />
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














