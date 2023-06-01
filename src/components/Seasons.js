import React, { createContext, useContext, useEffect, useState } from "react";
import DropDown from "react-dropdown";

export const SeasonContext = createContext();

const Seasons = () => {
    const [seasons, setSeasons] = useState([]);
    const seasonContext = useContext(SeasonContext);

    useEffect(() => {
        getSeasons();
    }, []);

    const getSeasons = async () => {
        try {
            const tempSeasons = [];

            for (let i = 1950; i <= 2023; i++) {
                tempSeasons.push(i.toString());
            }

            setSeasons(tempSeasons);
        } catch (error) {
            console.error(`Error retrieving race results:`, error);
        }
    }

    const handleClickSeason = (season) => {
        seasonContext.setSeasonCallback(season.value);
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