import { Grid, List, ListItem, makeStyles } from '@material-ui/core';
import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { ShopZoneData } from '../../../types';
import Shop from './Shop';


const useStyles = makeStyles((theme) => ({
  root: {

  }
}))

export default function ShopInfo() {
  const { matchedZones, allZones } = useSelector((state: RootStateOrAny) => state.shop.fetchedZones)
  const classes = useStyles();
  return (
    <Grid container spacing={3} className={classes.root}>
      {matchedZones.map((zone: ShopZoneData, index: number ) => (
        <Grid item xs={12} key={Math.random() * 100000}>
          <Shop data={zone} index={index + 1}/>
        </Grid>
      ))}
      {allZones.length && !matchedZones.length && (
        <Grid item xs={12} key={Math.random() * 100000}>
          <Shop data={allZones[0]} index={1} />
        </Grid>
      )}
    </Grid>
  );
}
