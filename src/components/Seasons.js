import React, { createContext, useContext, useEffect, useState } from "react";

export const SeasonContext = createContext();

const Seasons = () => {
    const [seasons, setSeasons] = useState([]);
    const seasonContext = useContext(SeasonContext);
    const currentYear = new Date().getFullYear().toString();
    

    useEffect(() => {
        getSeasons();
        // eslint-disable-next-line
    }, []);

    const getSeasons = async () => {
        try {
            const tempSeasons = [];

            for (let i = currentYear; i >= 1950; i--) {
                tempSeasons.push(i.toString());
            }

            setSeasons(tempSeasons);
        } catch (error) {
            console.error(`Error retrieving race results:`, error);
        }
    }

    const handleClickSeason = (e) => {
        if(seasons.includes(e.target.value)) {
            seasonContext.setSeasonCallback(e.target.value);
        }
    }

    return (
        <div>
            <p>Select season: </p>
            <input
                className="input-seasons"
                type="number"
                list="seasons"
                placeholder={seasonContext.season}
                min="1950"
                max={currentYear}
                onChange={handleClickSeason} />
            <datalist id="seasons">
                {seasons.map(season => 
                    <option key={season} value={season}></option>)}
            </datalist>
        </div>
    );
}

export default Seasons;