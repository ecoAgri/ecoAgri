import React from "react";
import Box from "@mui/material/Box";

export default function CenteredBox(props) {
  return (
    <Box sx={{ display: "flex", justifyContent: `${props.align}` }}>
      <Box >{props.children}</Box>
    </Box>
  );
}
