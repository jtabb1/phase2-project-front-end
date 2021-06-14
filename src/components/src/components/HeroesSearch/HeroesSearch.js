import React from "react";
import Input from '@material-ui/core/Input';

function Search({ onSearch, onSearchChange }) {
  return (
    <form className="searchbar" >
      
      <Input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value={onSearch}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </form>
  );
}

export default Search;