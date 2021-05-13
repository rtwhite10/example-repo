import {
  Box, Grid, makeStyles, Typography
} from '@material-ui/core';
import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import DateDialog from './DateDialog'
import { OrderPageContext } from '../context';
import { getShopZoneData } from '../../../_Redux/shopCrud';
import Geocode from 'react-geocode';
import {
  Circle, DrawingManager, GoogleMap, Marker, Polygon
} from '@react-google-maps/api';
// import { createZonePoly, createZoneShape } from '../../../_Redux/shopCrud';
import { google } from 'google-maps';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../_Redux/shopReducer';
import { MatchedZone, _Center, ShopZoneData } from '../../../types'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  dateContainer: {
    marginTop: 19.5,
    width: '100%'
  }
}));

export default function DatesAndRecomendations() {
  const {storePickUp} = React.useContext(OrderPageContext);
  const {allZones, country} = useSelector((state: RootStateOrAny) => state.shop.fetchedZones)
  const currentShopId = useSelector((state: RootStateOrAny) => state.shop.shop.id)
  const dispatch = useDispatch()
  const classes = useStyles();

  const circleContainsLocation = (point: any, circle: any) => {
    const radius = circle.getRadius()
    const center = circle.getCenter()
    const bounds = window.google.maps.geometry.spherical.computeDistanceBetween(point, center)
    console.log(bounds)
    return (bounds <= radius)
  }

  const findOverlappingZones = async (_address: string, zones: ShopZoneData[]) => {

    Geocode.setLanguage('en');

    Geocode.enableDebug();

    const address = await Geocode.fromAddress(_address)
    const result = new window.google.maps.Marker({position:address.results[0].geometry.location})
    const position = result.getPosition()

    // Loops though potential matching zones to filter out those that do not match
    const overlappingZones = zones.filter( (zone: ShopZoneData) => {
      if(zone.polygon && position) {
        const polygon = new window.google.maps.Polygon({paths:zone.polygon})
        const contains = window.google.maps.geometry.poly.containsLocation(
          position,
          polygon
        )
        return contains
      } 
      if(zone.circle && position) {
        const circle = new window.google.maps.Circle({center:zone.circle, radius:zone.distanceKm})
        return circleContainsLocation(position, circle)
      } 
    })
    dispatch(actions.AddmatchedZones(overlappingZones))
  }
  
  const getZones = (_address: string, _country: string) => { 
    getShopZoneData(_country)
    .then((res) => {
      dispatch(actions.AddfetchedZones(res.data))
      dispatch(actions.AddcurrentCountry(_country))
      findOverlappingZones(_address, res.data)
    })
    .catch(err => console.log(err))
  }

  const handleGetPotentialMatchingZones = (place: any) => {
    const autoSuggest = new window.google.maps.Geocoder()
    autoSuggest.geocode({address:place.label}, (res, status) => {
      if(status === 'OK') {
        const country = res[0].address_components.filter(({types}) => types.includes('country'))
        if(country.length) {
          getZones(place.label, country[0].long_name)
        }
      }
    })
  }

  return (
    <Box className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="body1">
            Recipient address
          </Typography>
          <GooglePlacesAutocomplete 
            apiKey="AIzaSyBBXjw5rxLrueS1J99eWWIUbi9C_c9Ha-w"
            selectProps={{
              onChange: handleGetPotentialMatchingZones
            }}
           />
        </Grid>
        <Grid item xs={6}>
          <Box className={classes.dateContainer}>
            <DateDialog />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
