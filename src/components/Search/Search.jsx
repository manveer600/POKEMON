import React, { useEffect, useState } from "react";
import "./search.css";
import useDebounce from "../../hooks/useDebounce";
function Search({updateSearchTerm}) {
  const debouncedCallback = useDebounce((e) => {
    updateSearchTerm(e.target.value);
  }, 700);
  return (
    <div className="search">
      <div className="label">
        <label>Search Your Fav Pokemon</label>
      </div>
      <div>
        <input
          className="search-bar"
          type="text"
          placeholder="Eg..bulbasaur"
          onChange={debouncedCallback}
        ></input>
      </div>
    </div>
  );
}

export default Search;
