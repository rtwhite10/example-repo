import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import { Box, makeStyles } from '@material-ui/core';
import { OrderPageContext } from '../context';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '600px',
    margin: 0,
    padding: theme.spacing(2),
  },
  text_area: {
    margin: '1rem 0'
  },
  container: {
    flexDirection: 'column',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  content: {
    display: 'flex',
    // flexDirection: 'column'
  },
  date_picker: {
    width: '100%'
  },
  dialogPaper: {

    height: '400px'
  },
  dateButton: {
    width: '100%',
    height: 38,
    fontSize: 16,
    justifyContent: 'flex-start',
    opacity: 0.8,
    '&:hover': {
      backgroundColor: '#fff'
    }
  }
}));

const Transition = React.forwardRef((
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) => <Slide direction="up" ref={ref} {...props} />);

export default function AlertDialogSlide() {
  const {deliveryDate, handleDateChange } = React.useContext(OrderPageContext);
  const [open, setOpen] = React.useState(false);
  const [focused, setFocused] = React.useState(true);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box className={classes.container}>
      <Button
        disableRipple
        disableFocusRipple
        variant="outlined"
        className={classes.dateButton}
        onClick={handleClickOpen}
      >
        {deliveryDate.format('MM/DD/YYYY')}
      </Button>
      <Dialog
        PaperProps={!open ? {
          style: {
            width: '350px',
            height: '200px'
          },
        } : {
          style: {
            width: '350px',
            height: '500px'
          },
        }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Select a new delivery date.</DialogTitle>
        <DialogContent className={classes.content}>
          <SingleDatePicker
            regular
            block
            numberOfMonths={1}
            date={deliveryDate}
            onDateChange={handleDateChange}
            focused={focused}
            onFocusChange={() => setFocused(true)}
            id="your_unique_id"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            finish
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
