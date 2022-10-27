import React, { useContext, useEffect, useRef, useState } from 'react';
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
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import "./GoogleMapContainer.css";
import axios from "axios";
import AddProductContext from '../../context/AddProduct-context';
import CenteredBox from '../ui/CenteredBox';

const style = {
  position: 'absolute',
  top: '15%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1,
  bgcolor: 'background.paper',
  p: 2,
  width: 450
};

const style2 = {
  position: 'absolute',
  top: '15%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1,
  bgcolor: 'background.paper',
  p: 2,
  width: 100
}
const API_KEY = "AIzaSyALcSlRXEsNoL2uMQtEx9x01OUAiXnbAj0"

function setLocationAddress(lat, lng, locationType) {
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
  ).then((response) => {
    locationType(response.data.results[0].formatted_address)
  })
}
function GoogleMapContainer(props) {
  const ctx = useContext(AddProductContext);
  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  const [center, setCenter] = useState(null)
  const [origin, setOrigin] = useState(null);

  //product location here
  const [destination, setDestination] = useState({ lng: 79.88389509223174, lat: 6.872037471140445 });

  useEffect(()=>{
    const setLocation = ()=>{
      setDestination({
        lng: props.longitude, lat: props.latitude
      });
    }
    setLocation();
  },[]);

  const setPath = async () => {
    
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
      setLocationAddress(position.coords.latitude, position.coords.longitude, setOrigin);
      setLocationAddress(destination.lat, destination.lng, setDestination);
    })
    calculateRoute(origin, destination)
  }

  async function getLiveLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })
  }

  useEffect(() => {
    if (props.mapType !== "get_live_location") {
      setPath()
    } else {
      getLiveLocation();
      navigator.geolocation.getCurrentPosition((position) => {
        ctx.setLiveLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      })
    }
  }, [origin, destination])

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: ['places'],
  })


  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  if (!isLoaded) {
    return <p>Loading ...</p>
  }


  async function calculateRoute(origin, destination) {
    console.log(origin, destination)
    if (origin === '' || destination === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: origin,
      destination: destination,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    console.log(results);
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

  const markerChangeHandler = (e) => {
    setCenter({ lat: e.latLng.lat(), lng: e.latLng.lng() })
    ctx.setLiveLocation({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
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
          // fullscreenControl: false,
        }}
        onLoad={map => setMap(map)}
      >
        <Marker position={center}
          icon="https://i.imgur.com/oz3r3Wq.png"
          onDragEnd={markerChangeHandler}
          draggable={true}
        />
        {props.mapType !== "get_live_location" &&
          <Marker position={destination}
            icon="https://i.imgur.com/cIooqnp.png"
          />
        }
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
      {props.mapType !== "get_live_location" ? (
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
              <Button sx={{ p: "3px" }} variant="outlined" style={{ textTransform: "none" }} type='submit' onClick={() => { calculateRoute(originRef.current.value, destiantionRef.current.value) }}>
                Distance
              </Button>
            </Grid>
            <Grid item xs={1}>
              <IconButton sx={{ p: "3px" }} onClick={clearRoute}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={4}>
              <Typography>Distance: {distance} </Typography>
            </Grid>
            <Grid item xs={4}>
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
            <Grid item xs={2}>
              <IconButton sx={{ p: "3px" }} onClick={getLiveLocation}>
                <GpsFixedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box sx={style2}>
          <Grid container>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
              <CenteredBox align="right">
                <IconButton sx={{ p: "3px" }} onClick={getLiveLocation}>
                  <GpsFixedIcon />
                </IconButton>
              </CenteredBox>
            </Grid>
          </Grid>
        </Box>
      )
      }
    </Box>

  )
}

export default GoogleMapContainer