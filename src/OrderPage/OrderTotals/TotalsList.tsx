import {
  Box, Grid, List, ListItem, makeStyles, Typography
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  list: {
    opacity: 0.8
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '8px 0'
  },
  text: {
    fontSize: 16
  }
}));

export default function TotalsList() {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Typography variant="body1" className={classes.text}>
          Flowers
        </Typography>
        <Typography variant="body1" className={classes.text}>
          $99.00
        </Typography>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Typography variant="body1" className={classes.text}>
          Add-ons
        </Typography>
        <Typography variant="body1" className={classes.text}>
          $99.00
        </Typography>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Typography variant="body1" className={classes.text}>
          Delivery
        </Typography>
        <Typography variant="body1" className={classes.text}>
          $99.00
        </Typography>
      </ListItem>
    </List>
  );
}
