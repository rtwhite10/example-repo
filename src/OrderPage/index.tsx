/* eslint-disable import/extensions */
import React, { FC } from 'react';
import {
  Container, Grid, makeStyles, Paper
} from '@material-ui/core';
import moment from 'moment';
import FormSelectionHeader from './FormSelectionHeader';
import DatesAndRecomendations from './DatesAndRecomendations';
import {
  Circle,
  DrawingManager, GoogleMap, InfoWindow, LoadScript, Marker, useJsApiLoader,
} from '@react-google-maps/api';
import { DynamicForm } from './DynamicForm';
import OrderTotals from './OrderTotals';
import reducer, { localState } from './context/reducer';
import { OrderPageContext } from './context';
import ShopInfo from './ShopInfo';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1.5rem'
  }
}));

export default function OrderPage() {
  const [state, localDispatch] = React.useReducer(reducer, localState);
  const { tabIndex, storePickUp, deliveryDate } = state;

  const classes = useStyles();

  const handleTabChangeIndex = (_tabIndex: number) => {
    localDispatch({ type: 'changeTab', payload: _tabIndex });
  };

  const handleStorePickUp = () => {
    localDispatch({ type: 'toggleStorePickUp' });
  };

  const handleDateChange = (newDate: moment.Moment | null) => {
    if (newDate) localDispatch({ type: 'changeDate', payload: newDate });
  };

  return (
    <Container maxWidth="xl">
      <OrderPageContext.Provider value={{
        tabIndex,
        storePickUp,
        deliveryDate,
        handleTabChangeIndex,
        handleStorePickUp,
        handleDateChange
      }}
      >
        <Paper className={classes.root}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <FormSelectionHeader />
              <DatesAndRecomendations />
            </Grid>
            <Grid item xs={12}>
              <ShopInfo />
            </Grid>
            <Grid item xs={12}>
              <DynamicForm formType={tabIndex} />
            </Grid>
          </Grid>
        </Paper>
      </OrderPageContext.Provider>
    </Container>
  );
}
