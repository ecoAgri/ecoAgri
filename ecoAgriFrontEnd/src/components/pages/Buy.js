import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MainHeader from "../layouts/MainHeader";
import BuyProducts from "../buy/BuyProducts";
import BuyProductActions from "../buy/BuyProductActions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import DistrictService from "../../services/DistrictService";
// import classes from '../../ui/HideScrollBar.module.css';

function Buy(props) {
  const user = useSelector((state) => state.user.currentUser);
  let userType = useSelector((state) => state.user.userType);
  const [location, setLocation] = useState("None");
  const [cities, setCities] = useState("None");
  const [flag, setFlag] = useState(false);
  const [flagCities, setFlagCities] = useState(false);
  // const userType = user.userrole ? user.userrole : "none";
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserExist = () => {
      console.log(userType);
      // alert("Hi");
      if (!userType) {
        // alert("ayi");
        navigate("/login");
      }
    };
    checkUserExist();
  }, []);

  const selectLocationSlice = (data) => {
    alert(data);
    setLocation(data);
    setFlag(!flag);
  };
  
  const selectCitiesSlice = (data) => {
    alert(data);
    setCities(data);
    setFlagCities(!flagCities);
  };
  const value =
    (userType === "Farmer" && 2) ||
    (userType === "Buyer" && 0) ||
    (userType === "Charity" && 0);
  return (
    <React.Fragment>
      <MainHeader value={value} />
      <Grid container sx={{ pt: "100px", px: 5 }}>
        <Grid item xs={12} sx={{ bgcolor: "#FFF" }}>
          {/* <BuyProductActions /> */}
          <Grid container sx={{ p: 3 }}>
            <Grid item xs={2} sm={2} md={2}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    District
                  </InputLabel>
                  <NativeSelect
                    defaultValue={30}
                    inputProps={{
                      name: "district",
                      id: "uncontrolled-native",
                    }}
                    onChange={(e) => {
                      selectLocationSlice(e.target.value);
                    }}
                  >
                    {/* {DistrictService.map((item)=>{
                      <option value={item.district}>{item.district}</option>
                    })} */}
                    <option value={"None"}>None</option>
                    <option value={"Colombo"}>Colombo</option>
                    <option value={"Galle"}>Galle</option>
                    <option value={"Gampaha"}>Gampaha</option>
                    <option value={"Kalutara"}>Kalutara</option>
                  </NativeSelect>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={8} sm={8} md={8}></Grid>
            <Grid item xs={2} sm={2} md={2}>
              {/* <SearchBar placeholder="What are you looking for..." /> */}
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Cities
                  </InputLabel>
                  <NativeSelect
                    defaultValue={30}
                    inputProps={{
                      name: "district",
                      id: "uncontrolled-native",
                    }}
                    onChange={(e) => {
                      selectCitiesSlice(e.target.value);
                    }}
                  >
                    <option value={"None"}>None</option>
                    <option value={"Maharagma"}>Maharagma</option>
                    <option value={"Nugegoda"}>Nugegoda</option>
                    <option value={"Piliyandala"}>Piliyandala</option>
                    <option value={"Dehiwala"}>Dehiwala</option>
                    <option value={"Kottawa"}>Kottawa</option>
                    <option value={"Borella"}>Borella</option>
                    <option value={"GalleCity"}>Galle City</option>
                    <option value={"Ambalangoda"}>Ambalangoda</option>
                    <option value={"Elpitiya"}>Elpitiya</option>
                    <option value={"Bentota"}>Bentota</option>
                    <option value={"Baddegama"}>Baddegama</option>
                    <option value={"GampahaCity"}>Gampaha City</option>
                    <option value={"Negombo"}>Negombo</option>
                    <option value={"Wattala"}>Wattala</option>
                    <option value={"Kiribathgoda"}>Kiribathgoda</option>
                    <option value={"Kadwatha"}>Kadwatha</option>
                    <option value={"Panadura"}>Panadura</option>
                    <option value={"KalutaraCity"}>Kalutara City</option>
                    <option value={"Horana"}>Horana</option>
                    <option value={"Bandaragama"}>Bandaragama</option>
                    <option value={"Matugama"}>Matugama</option>
                  </NativeSelect>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ bgcolor: "#FFF", mt: 3, p: 3 }}>
          <BuyProducts
            productType={props.productType}
            productCategory="Vegetable"
            locationDetail={location}
            cityDetail={cities}
            flag={flag}
            cityFlag={flagCities}
          />
        </Grid>
        <Grid item xs={12} sx={{ bgcolor: "#FFF", mt: 3, p: 3 }}>
          <BuyProducts
            productType={props.productType}
            productCategory="Fruits"
            locationDetail={location}
            cityDetail={cities}
            flag={flag}
            cityFlag={flagCities}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Buy;
