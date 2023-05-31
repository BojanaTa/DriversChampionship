import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../App";

const Search = () => {
    const [searchText, setSearchText] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const navigate = useNavigate();
    const dataContext = useContext(DataContext);

    useEffect(() => {
        populateSearchData();
    }, []);

    const populateSearchData = () => {
        let tempSearchData = [];
        dataContext.drivers.map(item => {
            tempSearchData.push({
                id: item.Driver.driverId,
                type: "drivers",
                searchTerm1: item.Driver.familyName,
                searchTerm2: item.Driver.givenName
            });
        });

        dataContext.teams.map(item => {
            tempSearchData.push({
                id: item.Constructor.constructorId,
                type: "teams",
                searchTerm1: item.Constructor.name,
                searchTerm2: ""
            });
        });

        dataContext.races.map(item => {
            tempSearchData.push({
                id: item.round,
                type: "races",
                searchTerm1: item.raceName,
                searchTerm2: ""
            });
        });

        setSearchData(tempSearchData);
    }

    const filterData = (query) => {
        // console.log("query", query);
        // console.log("serachData", searchData);
        let filtered = []
        if (query !== "") {
            filtered = searchData.filter((d) => {
                return d.searchTerm1.toLowerCase().includes(query) ||
                    d.searchTerm2.toLowerCase().includes(query);
            });
        }

        console.log("filteredData", filtered);

        setFilteredData(filtered);

        // console.log("filtered", filtered);
    }

    const handleChangeText = (event) => {
        // console.log(event.target.value);
        setSearchText(event.target.value);
        filterData(event.target.value);
    }

    const handleClickSearchItem = (id, type) => {
        const linkTo = `/${type}/${id}`;
        setFilteredData([]);
        setSearchText("");
        navigate(linkTo);
    }

    return (
        <div>
            <input
                type="text"
                value={searchText}
                placeholder="Search"
                onChange={handleChangeText}
                onFocus={populateSearchData} />

            {filteredData.map(item =>
                <p key={item.id}
                    onClick={() => handleClickSearchItem(item.id, item.type)}>{`${item.searchTerm1} ${item.searchTerm2}`}</p>
            )}
        </div>
    );
}

export default Search;