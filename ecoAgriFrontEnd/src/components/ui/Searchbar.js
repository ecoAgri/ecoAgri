import React, { useState } from "react";
import styled from "@mui/system/styled";
import InputBase from "@mui/material/InputBase";

import SearchIcon from "@mui/icons-material/Search";
import useInput from "../../hooks/use-input";
import { useNavigate } from "react-router-dom";
import { alpha } from "@mui/material";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#e8f5e9",
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  color: "#007A31",
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#007A31',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


function SearchBar(props) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const expandHandler = () => {
    setExpanded(!expanded);
  };

  const [searchedUsers, setSearchUsers] = useState([]);
  const {
    value: searchName,
    isValid: searchNameIsValid,
    hasError: searchNameHasError,
    error: searchNameError,
    valueChangeHandler: searchNameChangeHandler,
    inputBlurHandler: searchNameBlurHandler,
  } = useInput((value) => {
    return { inputIsValid: true, error: "" };
  })



  // const [searchName, setSearchName] = useState('');
  //   const searchUserHandler = (event) => {
  //     const searchData = new FormData();
  //     searchData.append("searchName", searchName)
  //     console.log(searchName);
  //     fetchUserData({
  //       url: "api/v1/logged-user/search-user",
  //       method: "post",
  //       data: searchData
  //     }).then((response) => {
  //       console.log(response.data)
  //       setSearchUsers(response.data);
  //     }).catch((error) => {
  //       console.log(error);
  //     })
  //   }
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder={props.placeholder}
        inputProps={{ "aria-label": "search" }}
        onClick={expandHandler}
      />

    </Search>
  );
}

export default SearchBar;
