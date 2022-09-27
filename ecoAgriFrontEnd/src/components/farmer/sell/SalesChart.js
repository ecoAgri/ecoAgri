import { ThemeProvider } from "@emotion/react";
import { Box, createTheme, Typography } from "@mui/material";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import CenteredBox from "../../ui/CenteredBox";

const data = [
  {
    name: "Monday",
    uv: 4000,
    Sales: 2400,
    amt: 2400
  },
  {
    name: "Tuesday",
    uv: 3000,
    Sales: 1398,
    amt: 2210
  },
  {
    name: "Wednesday",
    uv: 2000,
    Sales: 9800,
    amt: 2290
  },
  {
    name: "Thursday",
    uv: 2780,
    Sales: 3908,
    amt: 2000
  },
  {
    name: "Friday",
    uv: 1890,
    Sales: 4800,
    amt: 2181
  },
  {
    name: "Saturday",
    uv: 2390,
    Sales: 3800,
    amt: 2500
  },
  {
    name: "Sunday",
    uv: 3490,
    Sales: 4300,
    amt: 2100
  }
];

const theme = createTheme({
  palette: {
    primary: {
      main: "#007A31",
    },
  },
  typography: {
    fontFamily: "Poppins",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

export default function SalesChart() {
  return (
    <ThemeProvider theme={theme}>
      <CenteredBox>
          <CenteredBox align="center">
            <Typography variant="h5">Last 7 Days Sales</Typography>
          </CenteredBox>
          <BarChart
            width={650}
            height={400}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
            barSize={20}
          >
            <XAxis dataKey="name" scale="point" padding={{ left: 20, right: 20 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="Sales" fill="#007A31" background={{ fill: "#e8f5e9" }} />
          </BarChart>
      </CenteredBox>
    </ThemeProvider>
  );
}
