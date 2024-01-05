// SearchBar.js

import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { FaM, FaMagnifyingGlass } from "react-icons/fa6";
import { styled } from '@mui/system'

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: ${({theme, value}) => 
      !value && "white"};
    border: 'none';
    font-family:montserrat;
  }
`

  const handleSearch = () => {
    // You can perform search-related actions here
    onSearch(searchTerm);
  };

  return (
    <div style={{display: "flex", alignItems: "center", width:"100%"}}>
        <input
        type="text"
        placeholder="Search Companies..."
        value={searchTerm}
        style={{padding:"8px",width:"100%",border:"1px solid #ccc", borderRadius:4,marginRight:4, fontFamily:"Montserrat", outline:"none"}}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button style={{padding:"8px",backgroundColor:"#007bff",color:"#fff",border: "none",borderRadius:"4px",cursor: "pointer"}} onClick={handleSearch}>
        {/* Use your custom search symbol here */}
        <span role="img" aria-label="Search">
            <FaMagnifyingGlass/>
        </span>
        </button>
  </div>
  );
};

export default SearchBar;