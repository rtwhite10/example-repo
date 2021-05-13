import {
  Box, Grid, makeStyles, Typography
} from '@material-ui/core';
import React from 'react';
import { Button } from 'react-bootstrap';
import {ShopZoneData} from '../../../types'

const useStyles = makeStyles((theme) => ({
  root: {},
  text: {
    fontSize: 14
  },
  button: {

  }
}));

interface Props {
  index: number
  data: ShopZoneData
}

export default function Shop({data, index}: Props) {
  const {shippingStreet, shippingCity, shopName, price} = data;
  const classes = useStyles();
  return (
    <Grid container direction="row" spacing={3}>
      {/* Left column */}
      <Grid item container xs={6} justify="space-between">
        <Grid item>
          <Typography variant="body1" className={classes.text}>{index}.</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="body1" className={classes.text}>{shopName}</Typography>
          <Typography variant="body1" className={classes.text}>{shippingStreet}, {shippingCity}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" className={classes.text}>Distance km</Typography>
          <Typography variant="body1" className={classes.text}>1000</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" className={classes.text}>Stop time</Typography>
          <Typography variant="body1" className={classes.text}>only pickup</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" className={classes.text}>Delivery fee</Typography>
          <Typography variant="body1" className={classes.text}>{price}</Typography>
        </Grid>
      </Grid>
      {/* Right column */}
      <Grid item container direction="row" xs={6}>
        <Grid item xs={6}>
          <Typography variant="body1" className={classes.text}>Rating</Typography>
          <Typography variant="body1" className={classes.text}>Nr of rating</Typography>
        </Grid>
        <Grid item xs={6} container>
          <Grid item xs={6}>
            <Button disabled className={classes.button}>instagram</Button>
          </Grid>
          <Grid item xs={6}>
            <Button disabled className={classes.button}>see add ons</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
