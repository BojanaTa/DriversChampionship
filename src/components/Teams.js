import React, { useContext } from "react";
import { DataContext } from "../App";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Flag from "react-flagkit";
import { getFlagByNationality } from "../helpers/FlagHelper";

const Teams = () => {
  const dataContext = useContext(DataContext);
  const navigate = useNavigate();

  const handleClickTeams = (id) => {
    const linkTo = `/teams/${id}`;
    navigate(linkTo);
  };

  return (
    <div className="container">
      <h1>Teams</h1>
      <div className="header">Constructor Championships Standings - 2013</div>
      <table className="custom-table">
        <tbody>
          {dataContext.teams.map((team) => (
            <tr key={team.Constructor.constructorId}>
              <td>{team.position}</td>
              <td
                className="pointer"
                onClick={() => handleClickTeams(team.Constructor.constructorId)}
              >
                <Flag country={getFlagByNationality(team.Constructor.nationality, dataContext.flagsDetails)} />
                {team.Constructor.name}
              </td>
              <td>
                Details{" "}
                <Link to={team.Constructor.url} target="_blank">
                  <img
                    src="/images/link-black.png"
                    color="red"
                    className="link-btn"
                    alt="Wikipedia information about team"
                  />
                </Link>
              </td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Teams;















