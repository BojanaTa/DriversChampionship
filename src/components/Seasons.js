import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import DropDown from "react-dropdown";

export const SeasonContext = createContext();

const Seasons = () => {
    const [seasons, setSeasons] = useState([]);
    const [loading, setLoading] = useState(true);
    const seasonContext = useContext(SeasonContext);

    useEffect(() => {
        getSeasons();
    }, []);

    const getSeasons = async () => {
        try {
            const urlSeasons = "https://ergast.com/api/f1/seasons.json";
            const responseSeasons = await axios.get(urlSeasons);

            const tempSeasons = [];
            responseSeasons.data.MRData.SeasonTable.Seasons.map(season =>
                tempSeasons.push(season.season));
            setSeasons(tempSeasons);
            setLoading(false);
        } catch (error) {
            console.error(`Error retrieving race results:`, error);
            setLoading(false);
        }
    }

    const handleClickSeason = (season) => {
        seasonContext.setSeasonCallback(season.value);
    }

    if (loading) {
        return (
            <p></p>
        );
    }

    return (
        <div>
            <DropDown
                options={seasons}
                onChange={handleClickSeason}
                value={seasonContext.season}
                placeholder="Select season" />
        </div>
    );
}

export default Seasons;