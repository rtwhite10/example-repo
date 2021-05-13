import React from 'react';
import {
  Formik, useFormik, withFormik, FormikProps, FormikErrors, Form, Field
} from 'formik';
import * as Yup from 'yup';
import {
  Box, Checkbox, FormControlLabel, Grid, makeStyles, TextField
} from '@material-ui/core';
import SelectInput from '@material-ui/core/Select/SelectInput';
import { Button } from 'react-bootstrap';
import OrderTotals from '../OrderTotals';
import { OrderPageContext } from '../context';

import isValidEmail from '../../../_helpers/isValidEmail';
import isValidPhone from '../../../_helpers/isValidPhone';
import useWindowSize from '../../../hooks/useWindowSize';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mobileRoot: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  column: {
    width: '100%',
  },
  doorcodeContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // alignContent: 'center'
  },
  doorcodeCheckbox: {
    margin: '0',
    padding: '0',
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  twoFeildContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '48%'
  },
  singleFeildContainer: {
    width: '48%'
  },
  singleField: {
    width: '45%'
  },
  buttonContainer: {
    margin: '2rem 0',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: 250
  }
}));

interface formValues {
  nameOfDeceased?: string,
  recipientFirstName?: string,
  recipientLastName?: string,
  firstName: string,
  lastName: string,
  address: string,
  zip: string,
  ciy: string,
  messageToDriver: string,
  company: string,
  mobilePhone: string,
  email: string,
  messageToShop: string,
  orderNotes: string,
  bouquetDescription: string,
  typeOfFlower: string,
  productValue: number,
  cardText: string,
  leaveAtDoor: boolean,
  anonymous: boolean,
}

const InnerForm = (props: FormikProps<formValues>) => {
  const classes = useStyles();
  const { storePickUp, tabIndex } = React.useContext(OrderPageContext);
  const {
    touched, errors, isSubmitting, handleChange, values
  } = props;
  const { width } = useWindowSize();

  /** DESKTOP */
  if (width > 660) {
    return (
      <Form>
        <Box className={classes.root}>
          {/** Left column */}
          <Box className={classes.column} style={{ marginRight: '1rem' }}>
            <Grid container direction="column" spacing={3}>

              {/** First name last name order */}
              {/** Conditional check for render */}
              {tabIndex < 2 ? (
                <>
                  <Grid item>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <TextField id="recipientFirstName" onChange={handleChange} helperText={errors.recipientFirstName} error={!!errors.recipientFirstName && touched.recipientFirstName} name="recipientFirstName" label="Recipient first name" variant="outlined" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField id="recipientLastName" onChange={handleChange} helperText={errors.recipientLastName} error={!!errors.recipientLastName && touched.recipientLastName} name="recipientLastName" label="Recipient last name" variant="outlined" />
                      </Grid>
                    </Grid>
                  </Grid>
                  {/** CO Address */}
                  <Grid item>
                    <TextField fullWidth id="c/o address" onChange={handleChange} label="c/o address" variant="outlined" />
                  </Grid>
                  {/** Doorcode */}
                  <Grid item>
                    <TextField fullWidth id="Doorcode" onChange={handleChange} label="Doorcode" variant="outlined" />
                    <FormControlLabel
                      control={<Checkbox size="medium" onChange={handleChange} checked={values.leaveAtDoor} name="leaveAtDoor" />}
                      label="Allowed to leave by door"
                    />
                  </Grid>
                </>
              )
                : (
                  <Grid item>
                    {/** name of deceased */}
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <TextField id="nameOfDeceased" onChange={handleChange} label="Name of deceased" name="nameOfDeceased" variant="outlined" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField id="Name of deceased" onChange={handleChange} variant="outlined" />
                      </Grid>
                    </Grid>
                  </Grid>
                )}

              {/** First name last name ordere */}
              <Grid item>
                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    <TextField id="firstName" onChange={handleChange} helperText={errors.firstName} error={!!errors.firstName && touched.firstName} name="firstName" label="First name" variant="outlined" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField id="lastName" onChange={handleChange} helperText={errors.lastName} error={!!errors.lastName && touched.lastName} name="lastName" label="Last name" variant="outlined" />
                  </Grid>
                </Grid>
              </Grid>
              {/** Address */}
              <Grid item>
                <TextField fullWidth onChange={handleChange} id="address" name="address" label="Address" variant="outlined" />
              </Grid>
              {/** Zip city */}
              <Grid item>
                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    <TextField id="zip" onChange={handleChange} name="zip" label="Zip code" variant="outlined" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField id="city" onChange={handleChange} name="city" label="City" variant="outlined" />
                  </Grid>
                </Grid>
              </Grid>
              {/** Type of flower */}
              <Grid item>
                <TextField variant="outlined" onChange={handleChange} id="typeOfFlower" name="typeOfFlower" fullWidth label="Type of funeral flower">
                  test
                </TextField>
              </Grid>
              {/** Bouquet description */}
              <Grid item>
                <TextField multiline onChange={handleChange} rows={4} fullWidth id="bouquetDescription" name="bouquetDescription" label="Bouquet description" variant="outlined" />
              </Grid>
              {/** Card Text/Ribbon text */}
              <Grid item>
                <TextField multiline onChange={handleChange} rows={4} fullWidth id="cardText" name="cardText" label="Card text / Ribbon text" variant="outlined" />
              </Grid>
              {/** Product Value */}
              <Grid item>
                <TextField onChange={handleChange} id="productValue" name="productValue" label="Product value" variant="outlined" />
              </Grid>
            </Grid>

            {/** Price Totals */}

            <OrderTotals />

          </Box>
          <Box className={classes.column} style={{ marginLeft: '1rem' }}>
            {/** Right column */}
            <Grid container direction="column" spacing={3}>
              {/** Phone number */}
              <Grid item>
                <TextField fullWidth onChange={handleChange} helperText={errors.mobilePhone} error={!!errors.mobilePhone && touched.mobilePhone} id="mobilePhone" name="mobilePhone" label="Mobile phone" variant="outlined" />
              </Grid>
              {/** email */}
              <Grid item>
                <TextField fullWidth onChange={handleChange} helperText={errors.email} error={!!errors.email && touched.email} type="email" id="email" name="email" label="E-mail" variant="outlined" />
              </Grid>
              {/** Message to driver */}
              { !storePickUp && (
              <Grid item>
                <TextField multiline onChange={handleChange} rows={4} fullWidth id="messageToDriver" name="messageToDriver" label="Message to driver" variant="outlined" />
              </Grid>
              )}
              {/** Company */}
              <Grid item>
                <TextField fullWidth onChange={handleChange} id="company" name="company" label="Company" variant="outlined" />
              </Grid>
              {/** Message to shop */}
              <Grid item>
                <TextField multiline onChange={handleChange} rows={6} fullWidth id="messageToShop" name="messageToShop" label="Message to shop" variant="outlined" />
              </Grid>
              {/** Other notes */}
              <Grid item>
                <TextField fullWidth onChange={handleChange} id="orderNotes" name="orderNotes" label="Order notes" variant="outlined" />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box className={classes.buttonContainer}>
          <Button className={classes.button} type="submit" disabled={isSubmitting}>submit</Button>
        </Box>
      </Form>
    );
  }

  /** MOBILE */
  return (
    <Box component="form" className={classes.mobileRoot}>
      {/** Left column */}
      <Grid container direction="column" spacing={3}>
        {/** First name last name order */}
        {/** Conditional check for render */}
        {tabIndex < 2 ? (
          <>
            <Grid item>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <TextField id="recipientFirstName" onChange={handleChange} helperText={errors.recipientFirstName} error={!!errors.recipientFirstName && touched.recipientFirstName} name="nameOfDeceased" label="Recipient first name" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                  <TextField id="recipientLastName" onChange={handleChange} helperText={errors.recipientLastName} error={!!errors.recipientLastName && touched.recipientLastName} name="nameOfDeceased" label="Recipient last name" variant="outlined" />
                </Grid>
              </Grid>
            </Grid>
            {/** CO Address */}
            <Grid item>
              <TextField fullWidth id="c/o address" onChange={handleChange} label="c/o address" variant="outlined" />
            </Grid>
            {/** Doorcode */}
            <Grid item>
              <TextField fullWidth id="Doorcode" onChange={handleChange} label="Doorcode" variant="outlined" />
              <FormControlLabel
                control={<Checkbox size="medium" onChange={handleChange} checked={values.leaveAtDoor} name="leaveAtDoor" />}
                label="Allowed to leave by door"
              />
            </Grid>
          </>
        )
          : (
            <Grid item>
              {/** name of deceased */}
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <TextField id="nameOfDeceased" onChange={handleChange} label="Name of deceased" name="nameOfDeceased" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                  <TextField id="Name of deceased" onChange={handleChange} variant="outlined" />
                </Grid>
              </Grid>
            </Grid>
          )}

        {/** First name last name ordere */}
        <Grid item>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <TextField id="firstName" onChange={handleChange} helperText={errors.firstName} error={!!errors.firstName && touched.firstName} name="firstName" label="First name" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <TextField id="lastName" onChange={handleChange} helperText={errors.lastName} error={!!errors.lastName && touched.lastName} name="lastName" label="Last name" variant="outlined" />
            </Grid>
          </Grid>
        </Grid>

        {/** Address */}
        <Grid item>
          <TextField fullWidth onChange={handleChange} id="c/o address" label="c/o address" variant="outlined" />
        </Grid>
        {/** Zip city */}
        <Grid item>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <TextField id="Zip code" onChange={handleChange} label="Zip code" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <TextField id="City" onChange={handleChange} label="City" variant="outlined" />
            </Grid>
          </Grid>
        </Grid>
        {/** Type of flower */}
        <Grid item>
          <TextField variant="outlined" onChange={handleChange} fullWidth label="Bouquet suggestion">
            test
          </TextField>
        </Grid>
        {/** Bouquet description */}
        <Grid item>
          <TextField multiline onChange={handleChange} rows={4} fullWidth id="Bouquet description" label="Bouquet description" variant="outlined" />
        </Grid>
        {/** Product Value */}
        <Grid item>
          <TextField id="Product value" onChange={handleChange} label="Product value" variant="outlined" />
        </Grid>
        {/** Message to driver */}
        <Grid item>
          <TextField multiline onChange={handleChange} rows={4} fullWidth id="Message to driver" label="Message to driver" variant="outlined" />
        </Grid>
        {/** Company */}
        <Grid item>
          <TextField fullWidth onChange={handleChange} id="Company" label="Company" variant="outlined" />
        </Grid>
        {/** Phone number */}
        <Grid item>
          <TextField fullWidth onChange={handleChange} helperText={errors.mobilePhone} error={!!errors.mobilePhone && touched.mobilePhone} id="mobilePhone" name="mobilePhone" label="Mobile phone" variant="outlined" />
        </Grid>
        {/** email */}
        <Grid item>
          <TextField fullWidth onChange={handleChange} helperText={errors.email} error={!!errors.email && touched.email} type="email" id="email" name="email" label="E-mail" variant="outlined" />
        </Grid>
        {/** Card Text/Ribbon text */}
        <Grid item>
          <TextField multiline onChange={handleChange} rows={4} fullWidth id="Card text / Ribbon text" label="Card text / Ribbon text" variant="outlined" />
        </Grid>
        {/** Message to shop */}
        <Grid item>
          <TextField multiline onChange={handleChange} rows={6} fullWidth id="Message to shop" label="Message to shop" variant="outlined" />
        </Grid>
        {/** Other notes */}
        <Grid item>
          <TextField fullWidth onChange={handleChange} id="Order notes" label="Order notes" variant="outlined" />
        </Grid>
      </Grid>

      {/** Price Totals */}
      <OrderTotals />
      <Box className={classes.buttonContainer}>
        <Button className={classes.button} type="submit" disabled={isSubmitting}>submit</Button>
      </Box>

    </Box>
  );
};

// Place holder incase props are need to be passed in
interface MyFormProps {
  formType: number

}

// eslint-disable-next-line import/prefer-default-export
export const DynamicForm = withFormik<MyFormProps, formValues>({
  mapPropsToValues: () => ({
    nameOfDeceased: '',
    recipientFirstName: '',
    recipientLastName: '',
    firstName: '',
    lastName: '',
    address: '',
    zip: '',
    ciy: '',
    messageToDriver: '',
    company: '',
    mobilePhone: '',
    email: '',
    messageToShop: '',
    orderNotes: '',
    bouquetDescription: '',
    typeOfFlower: '',
    productValue: 0,
    cardText: '',
    leaveAtDoor: false,
    anonymous: false,
  }),

  validate: (values: formValues, { formType }: MyFormProps) => {
    const errors: FormikErrors<formValues> = {};

    /* Email Validation */
    if (!values.email) {
      errors.email = 'Required';
    } else if (!isValidEmail(values.email)) {
      errors.email = 'Invalid email address';
    }
    /* Phone Validation */
    if (!values.mobilePhone) {
      errors.mobilePhone = 'Required';
    }
    // Need a better phone validation
    // else if (!isValidPhone(values.mobilePhone)) {
    //   errors.mobilePhone = 'Invalid Phone number';
    // }

    /* nameOfDeceased Validation */
    if (!values.nameOfDeceased && formType === 2) {
      errors.nameOfDeceased = 'Required';
    }

    /* firstName Validation */
    if (!values.firstName) {
      errors.firstName = 'Required';
    }

    /* lastName Validation */
    if (!values.lastName) {
      errors.lastName = 'Required';
    }

    /* Recipients firstName Validation */
    if (!values.recipientFirstName && formType < 2) {
      errors.recipientFirstName = 'Required';
    }

    /* Recipients lastName Validation */
    if (!values.recipientLastName && formType < 2) {
      errors.recipientLastName = 'Required';
    }

    return errors;
  },
  handleSubmit: (values) => {
    console.log('fired');
    console.log(values);
  }
})(InnerForm);
