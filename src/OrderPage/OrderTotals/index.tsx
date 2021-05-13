import {
  Box, Grid, List, ListItem, makeStyles, Typography
} from '@material-ui/core';
import React from 'react';
import AddOnProduct from './AddOnProduct';
import TotalsList from './TotalsList';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: '32px 0'
  },
  list: {

  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  totals: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  text: {
    fontSize: 16
  }
}));

export default function OrderTotals() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Grid container direction="column" spacing={3}>
        <Grid item container direction="column" spacing={2}>
          <Grid item>
            <AddOnProduct />
          </Grid>
          <Grid item>
            <AddOnProduct />
          </Grid>
          <Grid item>
            <AddOnProduct />
          </Grid>
        </Grid>
        <Grid item>
          <TotalsList />
        </Grid>
        <Grid item>
          <Box className={classes.totals}>
            <Typography variant="body1" className={classes.text}>Total</Typography>
            <Typography variant="body1" className={classes.text}>Total Price</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
