export const getFlagByNationality = (driverNationality, flagsDetails) => {
    let nationality = "";

    if (driverNationality === "British") {
        nationality = "British, UK";
    } else if (driverNationality === "Dutch") {
        nationality = "Dutch, Netherlandic";
    } else {
        nationality = driverNationality;
    }

    const flag = flagsDetails.find(item => item.nationality === nationality);
    
    return flag?.alpha_2_code;
}

export const getFlagByCountry = (raceCountry, flagsDetails) => {
    let country = "";

    if (raceCountry === "UK") {
        country = "United Kingdom of Great Britain and Northern Ireland";
    } else if (raceCountry === "Korea") {
        country = "Korea (Republic of)";
    } else if (raceCountry === "UAE") {
        country = "Saudi Arabia";
    } else if (raceCountry === "USA") {
        country = "United States of America";
    } else {
        country = raceCountry;
    }

    const flag = flagsDetails.find(item => item.en_short_name === country);

    return flag?.alpha_2_code;
}