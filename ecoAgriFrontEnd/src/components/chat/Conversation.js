import { CssBaseline, Typography } from '@mui/material'
import React from 'react'
import Message from './Message'

function Conversation() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Typography>Kumud Perera</Typography>
      {/* <Message type="send" />
      <Message type="receive" /> */}
    </React.Fragment>
  )
}

export default Conversation