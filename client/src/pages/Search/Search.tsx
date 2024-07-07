import React, { useContext, useEffect, useState } from "react";
import "./Search.css";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import SearchedProfile from "../../components/search/SearchedProfile";
import { authContext } from "../../context/authContext";
import { userContext } from "../../context/userContext";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([] as any[]);

  const {currentUser} = useContext(authContext);
  const { userInfo, fetchUserInfo } = useContext(userContext);

  useEffect(() => {
    fetchUserInfo(currentUser);
  }, [currentUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const searchUser = async () => {
    setLoading(true);
    try {      
      const res = await axios.post("http://localhost:8001/api/search/user", {
        username: searchValue,
        user_id : userInfo.user_id,
      });
      setSearchResults(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchValue) searchUser();
      else setSearchResults([]);
    }, 1000);

    return () => {
      clearTimeout(debounceTimer);
    };
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
        <div className="search__results">
          {loading ? (
            <p>Loading...</p>
          ) : (
            searchResults.map((result) => (
              <SearchedProfile key={result.user_id} profile={result} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
