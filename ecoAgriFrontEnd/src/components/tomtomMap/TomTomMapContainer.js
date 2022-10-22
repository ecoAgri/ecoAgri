import { Box, Button, Grid, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import * as tt from '@tomtom-international/web-sdk-maps'
import * as ttapi from '@tomtom-international/web-sdk-services'
import '@tomtom-international/web-sdk-maps/dist/maps.css'

import "./TomTomMapContainer.css";
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
const DUMMY_DELIVERIES = [
    {lng: 79.85707957246194, lat: 6.932809810074815}
    // {lng: 79.88922832802155, lat: 6.869367245163559},
    // {lng: 79.89069906133057, lat: 6.85667478076337},
]
function TomTomMapContainer() {
    const API_KEY = "30RGuzTpiqtGgBwneplZbEoNDynkiabU"
    const mapElement = useRef()
    const [map, setMap] = useState({})
    const [longitude, setLongitude] = useState(79.899681)
    const [latitude, setLatitude] = useState(6.864908)
    // console.log(process.env.ECOAGRI_TOM_TOM_API_KEY)
    const convertToPoints = (lngLat) => {
        return {
            point: {
                latitude: lngLat.lat,
                longitude: lngLat.lng
            }
        }
    }

    const drawRoute = (geoJson, map) => {
        if (map.getLayer('route')) {
            map.removeLayer('route')
            map.removeSource('route')
        }
        map.addLayer({
            id: 'route',
            type: 'line',
            source: {
                type: 'geojson',
                data: geoJson
            },
            paint: {
                'line-color': '#4a90e2',
                'line-width': 6
            }
        })
    }

    const addDeliveryMarker = (lngLat, map) => {
        const element = document.createElement('div')
        element.className = 'marker-delivery'
        new tt.Marker({
            element: element
        })
            .setLngLat(lngLat)
            .addTo(map)
    }

    // useEffect(() => {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //       setCenter({
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude,
    //       })
    //     })
    //   }, [])
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLongitude(position.coords.longitude);
            setLatitude(position.coords.latitude);
        })
        const origin = {
            lng: longitude,
            lat: latitude,
        }

        console.log(origin);
        const destinations = []

        let map = tt.map({
            key: API_KEY,
            container: mapElement.current,
            stylesVisibility: {
                trafficIncidents: true,
                trafficFlow: true,
            },
            language: "en-US",
            center: [longitude, latitude],
            zoom: 14,
        })
        setMap(map)

        const addMarker = () => {
            const popupOffset = {
                bottom: [0, -25]
            }
            const popup = new tt.Popup({ offset: popupOffset }).setHTML('This is you!')
            const element = document.createElement('div')
            element.className = 'marker'

            const marker = new tt.Marker({
                draggable: true,
                element: element,
            })
                .setLngLat([longitude, latitude])
                .addTo(map)

            marker.on('dragend', () => {
                const lngLat = marker.getLngLat()
                setLongitude(lngLat.lng)
                setLatitude(lngLat.lat)
            })

            marker.setPopup(popup).togglePopup()

        }
        addMarker()

        const sortDestinations = (locations) => {
            const pointsForDestinations = locations.map((destination) => {
                return convertToPoints(destination)
            })
            const callParameters = {
                key: API_KEY,
                destinations: pointsForDestinations,
                origins: [convertToPoints(origin)],
            }

            return new Promise((resolve, reject) => {
                ttapi.services
                    .matrixRouting(callParameters)
                    .then((matrixAPIResults) => {
                        const results = matrixAPIResults.matrix[0]
                        const resultsArray = results.map((result, index) => {
                            return {
                                location: locations[index],
                                drivingtime: result.response.routeSummary.travelTimeInSeconds,
                            }
                        })
                        resultsArray.sort((a, b) => {
                            return a.drivingtime - b.drivingtime
                        })
                        const sortedLocations = resultsArray.map((result) => {
                            return result.location
                        })
                        resolve(sortedLocations)
                    })
            })
        }

        const recalculateRoutes = () => {
            sortDestinations(destinations).then((sorted) => {
                sorted.unshift(origin)

                ttapi.services
                    .calculateRoute({
                        key: API_KEY,
                        locations: sorted,
                    })
                    .then((routeData) => {
                        const geoJson = routeData.toGeoJson()
                        drawRoute(geoJson, map)
                    })
            })
        }

        DUMMY_DELIVERIES.map((lngLat) => {
            destinations.push(lngLat)
            addDeliveryMarker(lngLat, map)
            recalculateRoutes()
        })
        map.on('click', (e) => {
            console.log(e.lngLat);
            destinations.push(e.lngLat)
            addDeliveryMarker(e.lngLat, map)
            recalculateRoutes()
        })

        return () => map.remove()
    }, [longitude, latitude])

    return (
        <>
            {map && (
                <Box sx={{
                    height: "400px",
                    position: "relative"
                }}
                >

                    <div ref={mapElement} className="map" />
                    {/* <Box sx={style}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField
                                    style={{ zIndex: 2000 }}
                                    variant="standard"
                                    type="text"
                                    id="longitude"
                                    className="longitude"
                                    placeholder="Put in Longitude"
                                    onChange={(e) => {
                                        setLongitude(e.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    type="text"
                                    variant="standard"
                                    id="latitude"
                                    className="latitude"
                                    placeholder="Put in latitude"
                                    onChange={(e) => {
                                        setLatitude(e.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    sx={{ p: "3px" }}
                                    variant="outlined"
                                    style={{ textTransform: "none" }}
                                    type='submit'
                                //  onClick={calculateRoute}
                                >
                                    Distance
                                </Button>
                            </Grid>
                            <Grid item xs={1}>
                            </Grid>
                        </Grid >
                    </Box> */}
                </Box>

            )}
        </>
    )

}

export default TomTomMapContainer

{/* <Box sx={style}>
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
      </Box> */}