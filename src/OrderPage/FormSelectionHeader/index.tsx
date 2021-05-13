import {
  AppBar, Tabs,
  Box, Checkbox, FormControlLabel, FormGroup, makeStyles, Tab
} from '@material-ui/core';
import React from 'react';
import { OrderPageContext } from '../context';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '2rem',
  },
  tabContainer: {
    display: 'flex',
  },
  tab: {
    fontSize: 16,
    display: 'flex',
    justifyContent: 'flex-start',
  }
}
));

function a11yProps(index: number | string) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function FormSlectionHeader() {
  const [state, setState] = React.useState({
    ownOrder: false,
    pickUpOnly: false,
    tabPosition: 2
  });
  const {
    tabIndex, handleTabChangeIndex, storePickUp, handleStorePickUp
  } = React.useContext(OrderPageContext);
  const classes = useStyles();

  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    handleTabChangeIndex(newValue);
  };

  return (
    <Box className={classes.root}>
      <FormGroup row>
        <FormControlLabel
          control={<Checkbox checked={state.ownOrder} onChange={handleChangeCheckBox} name="ownOrder" />}
          label="Own order"
        />
        <FormControlLabel
          control={<Checkbox checked={storePickUp} onChange={handleStorePickUp} name="pickUpOnly" />}
          label="Pick-up in store"
        />
      </FormGroup>
      <Tabs value={tabIndex} onChange={handleChangeTab} className={classes.tabContainer} aria-label="order page tabs">
        <Tab className={classes.tab} label="Person" {...a11yProps(0)} />
        <Tab className={classes.tab} label="Company" {...a11yProps(1)} />
        <Tab className={classes.tab} label="Funeral" {...a11yProps(2)} />
      </Tabs>
    </Box>
  );
}
