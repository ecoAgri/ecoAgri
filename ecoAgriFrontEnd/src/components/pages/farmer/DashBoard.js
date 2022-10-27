import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import Advertisement from "../../farmer/dashboard/Advertisement";
import DashboardTabs from "../../farmer/dashboard/DashboardTabs";
import LeftBar from "../../layouts/farmer/LeftBar";
import RightBar from "../../layouts/farmer/RightBar";
import MainHeader from "../../layouts/MainHeader";
import classes from "../../ui/HideScrollBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

function DashBoard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userType = useSelector((state) => state.user.userType);

  useEffect(() => {
    // alert("hiii");
    const checkUserExist = () => {
      if (userType == null) {
        navigate("/login");
      }
    };
    checkUserExist();
  }, []);
  return (
    <React.Fragment>
      <MainHeader value={0} />
      <Grid container spacing={2} sx={{ pt: "100px", px: 5 }}>
        <Grid item xs={12}>
          <DashboardTabs />
        </Grid>
        {/* <Grid item xs={2}>
          <Advertisement />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}

export default DashBoard;
