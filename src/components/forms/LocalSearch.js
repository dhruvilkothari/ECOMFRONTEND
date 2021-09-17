import React from "react";

function LocalSearch({ keyword, setKeyword }) {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <input
      type="search"
      placeholder="Filter"
      value={keyword}
      className="form-control mb-4 mt-4"
      onChange={handleSearchChange}
    />
  );
}

export default LocalSearch;
