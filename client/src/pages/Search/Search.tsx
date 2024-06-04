import React, { useEffect, useState } from "react";
import "./Search.css";
import { IoSearch } from "react-icons/io5";
import axios from "axios";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([] as any[]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const searchUser = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/search/user", {
        username: searchValue,
      });
      setSearchResults(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchValue) searchUser();
      else setSearchResults([]);
    }, 1000);

    return () => {
      clearTimeout(debounceTimer);
    }
  }, [searchValue]);

  return (
    <>
      <div className="search">
        <h1 className="search__header">Search</h1>
        <form className="search__form">
          <div className="search__input-wrapper">
            <IoSearch className="search__icon" />
            <input
              type="text"
              className="search__input"
              placeholder="Search"
              value={searchValue}
              onChange={handleInputChange}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Search;
