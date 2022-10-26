import React from "react";
import { Box, styled } from "@mui/material";
import Logo from "../../assets/images/ecoAgri.png";
import { useNavigate } from "react-router";

function LogoCom() {
  const LogoBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    // width: 554,
    // height: 600,
    top: 0,
    left: 0,
    [theme.breakpoints.down("sm")]: {
      width: 300,
      height: 300,
    },
  }));

  const IconBoxOne = styled(Box)(({ theme }) => ({
    boxSizing: "border-box",

    position: "absolute",

    width: "552px",
    height: "551px",
    border: "5px solid #186918",
    borderRadius: "552px",
    left: "-280px",
    top: "-315px",
    [theme.breakpoints.down("lg")]: {
      left: "-360px",
    },
    [theme.breakpoints.down("md")]: {
      left: "-409px",
      top: "-347px"
    },
    [theme.breakpoints.down("sm")]: {

    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  }));

  const IconBoxTwo = styled(Box)(({ theme }) => ({
    boxSizing: "border-box",

    position: "absolute",

    width: "549px",
    height: "546px",
    border: "5px solid #E2B101",
    borderRadius: "552px",
    left: "-307px",
    top: "-250px",
    [theme.breakpoints.down("lg")]: {
      left: "-382px",
    },
    [theme.breakpoints.down("md")]: {
      left: "-427px",
      top: "-303px"
    },
    [theme.breakpoints.down("sm")]: {

    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  }));

  const BoxImage = styled(Box)(({ theme }) => ({
    height: 144,
    width: 136,
    position: "absolute",
    cursor: "pointer",
    zIndex: 10000,
    top: 5,
    left: 8,
    [theme.breakpoints.down("lg")]: {
      height: 105,
      width: 105,
      top: 5,
      left: 8,
    },
    [theme.breakpoints.down("md")]: {
      height: 84,
      width: 84,
      top: 5,
      left: 8,
    },
    [theme.breakpoints.down("sm")]: {
      height: 55,
      width: 55,

      top: 0,
      left: 0,
    },
  }));

  const navigate = useNavigate();
  return (
    <LogoBox>
      <BoxImage component="img" alt="The house from the offer." src={Logo} onClick={() => {navigate("/")}} />
      <IconBoxOne></IconBoxOne>
      <IconBoxTwo></IconBoxTwo>
    </LogoBox>
  );
}

export default LogoCom;
