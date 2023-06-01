import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../contexts/GetDataContext";

const Search = () => {
    const [searchText, setSearchText] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const navigate = useNavigate();
    const dataContext = useContext(DataContext).contextValue;

    useEffect(() => {
        populateSearchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const populateSearchData = () => {
        let tempSearchData = [];
        dataContext.drivers?.map(item => {
            return tempSearchData.push({
                id: item.Driver.driverId,
                type: "drivers",
                searchTerm1: item.Driver.familyName,
                searchTerm2: item.Driver.givenName
            });
        });

        dataContext.teams?.map(item => {
            return tempSearchData.push({
                id: item.Constructor.constructorId,
                type: "teams",
                searchTerm1: item.Constructor.name,
                searchTerm2: ""
            });
        });

        dataContext.races?.map(item => {
            return tempSearchData.push({
                id: item.round,
                type: "races",
                searchTerm1: item.raceName,
                searchTerm2: ""
            });
        });

        setSearchData(tempSearchData);
    }

    const filterData = (query) => {
        let filtered = []
        if (query !== "") {
            filtered = searchData.filter((d) => {
                return d.searchTerm1.toLowerCase().includes(query.toLowerCase()) ||
                    d.searchTerm2.toLowerCase().includes(query.toLowerCase());
            });
        }

        setFilteredData(filtered);
    }

    const handleChangeText = (event) => {
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
        <div className="search-container">
            <input
                className="search-input"
                type="text"
                value={searchText}
                placeholder="Search"
                onChange={handleChangeText}
                onFocus={populateSearchData} />

            <div className="search-suggestions">
                {filteredData.map(item =>
                    <p key={item.id}
                        onClick={() => handleClickSearchItem(item.id, item.type)}>{`${item.searchTerm1} ${item.searchTerm2}`}</p>
                )}
            </div>
        </div>
    );
}

export default Search;