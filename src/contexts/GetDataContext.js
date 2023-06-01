import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const DataContext = createContext();

const GetDataContext = (props) => {
    const [selectedSeason, setSelectedSeason] = useState(props.currentSeason);

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSeason]);

    const getData = async () => {
        console.log("Data loading start");

        const urlDrivers = `http://ergast.com/api/f1/${props.currentSeason}/driverStandings.json`;
        // const urlDrivers = `https://raw.githubusercontent.com/nkezic/f1/main/AllDrivers`;
        const urlTeams = `http://ergast.com/api/f1/${props.currentSeason}/constructorStandings.json`;
        // const urlTeams = "https://raw.githubusercontent.com/nkezic/f1/main/AllTeams";
        const urlRaces = `https://ergast.com/api/f1/${props.currentSeason}/results/1.json`;
        // const urlRaces = "https://raw.githubusercontent.com/nkezic/f1/main/AllRaces";
        const urlFlags = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
        const responseDrivers = await axios.get(urlDrivers);
        const responseTeams = await axios.get(urlTeams);
        const responseRaces = await axios.get(urlRaces);
        const responseFlags = await axios.get(urlFlags);

        console.log("Data loading end");

        props.callback(
            {
                drivers: responseDrivers.data.MRData.StandingsTable.StandingsLists[0].DriverStandings,
                teams: responseTeams.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings,
                races: responseRaces.data.MRData.RaceTable.Races,
                flagsDetails: responseFlags.data,
            }
        );
    }

    if(selectedSeason != props.currentSeason) {
        setSelectedSeason(props.currentSeason);
    }
}

export default GetDataContext