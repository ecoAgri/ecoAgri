import React, { useRef, useState } from 'react';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { Box, Stack } from '@mui/system';
import { Button, ButtonGroup, Grid, IconButton, TextField, Typography } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
import CloseIcon from '@mui/icons-material/Close';
import "./GoogleMapContainer.css";


const style = {
  position: 'absolute',
  top: '15%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1,
  bgcolor: 'background.paper',
  p: 2,
  width: 450
  // boxShadow: 24,
  // pt: 0,
  // pr: 0
};

const center = { lat: 6.864908, lng: 79.899681 }

function GoogleMapContainer() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCRfgjfFDYHisegvLIyjG3-E87rFD64kXk",
    libraries: ['places'],
  })

  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  if (!isLoaded) {
    return <p>Loading ...</p>
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }


  return (
    <Box sx={{
      height: "400px",
      position: "relative"
    }}
    >

      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={map => setMap(map)}
      >
        <Marker position={center} />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
      <Box sx={style}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Autocomplete>
              <TextField
                style={{ zIndex: 2000 }}
                type='text'
                placeholder='Origin'
                inputRef={originRef}
                variant="standard"
              />
            </Autocomplete>
          </Grid>
          <Grid item xs={5}>
            <Autocomplete>
              <TextField
                type='text'
                placeholder='Destination'
                inputRef={destiantionRef}
                variant="standard"
              />
            </Autocomplete>
          </Grid>
          <Grid item xs={2}>
            <Button sx={{ p: "3px" }} variant="outlined" style={{ textTransform: "none" }} type='submit' onClick={calculateRoute}>
              Distance
            </Button>
          </Grid>
          <Grid item xs={1}>
            <IconButton sx={{ p: "3px" }} onClick={clearRoute}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid >
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={5}>
            <Typography>Distance: {distance} </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography>Duration: {duration} </Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton
              sx={{ p: "3px" }}
              onClick={() => {
                map.panTo(center)
                map.setZoom(15)
              }}
            >
              <NavigationIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </Box>

  )
}

export default GoogleMapContainer