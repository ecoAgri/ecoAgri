import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import CenteredBox from '../../ui/CenteredBox'

const style = {
  // position: 'absolute',
  // top: '50%',
  // left: '50%',
  // transform: 'translate(-50%, -50%)',
  // width: 1000,
  // height: 505,
  bgcolor: 'background.paper',
  overflow: "auto",
  // border: "none",
  boxShadow: 10,
  borderRadius: 2,
  p: 4,
};
function DashBoardItem(props) {
  return (
    <React.Fragment>
      <Box sx={style}>
        <CenteredBox align="left">
          <Typography sx={{mb: 2}} variant="h5">{props.tableName}</Typography>
        </CenteredBox>
        {/* <CenteredBox align="center"> */}
            {props.table}
          {/* <Button onClick={clickHanlder} variant="contained" sx={{ textTransform: "none", mb: 2 }}>Donate</Button> */}
        {/* </CenteredBox> */}
      </Box>
    </React.Fragment>
  )
}

export default DashBoardItem