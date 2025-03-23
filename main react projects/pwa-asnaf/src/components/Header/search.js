import React from "react";
function Search({ placeholder, handleSearch }) {
  return (
    <div className="search">
      <input
        className="search_input"
        type="text"
        id="lname"
        name="lname"
        placeholder={placeholder}
        onChange={handleSearch}
      />

      <button className="search_button"></button>
    </div>
  );
}
export default React.memo(Search);
