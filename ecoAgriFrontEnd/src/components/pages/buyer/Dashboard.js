import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import Buy from '../Buy'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userType = useSelector((state) => state.user.userType);

  useEffect(() => {
    const checkUserExist = () => {
      console.log(userType);
      if (userType == null) {
        navigate("/login");
      }
    };
    checkUserExist();
  }, [navigate]);
  return (
    <React.Fragment>
      <Buy productType="buy" />
    </React.Fragment>
  )
}

export default Dashboard