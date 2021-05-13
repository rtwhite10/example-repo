import {
  Box, Card, CardContent, IconButton, makeStyles, Typography
} from '@material-ui/core';
import React from 'react';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    opacity: 0.8
  },
  iconButton: {

  },
  quantityContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 40,
  },
  ammountCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    width: 40
  },
  text: {
    fontSize: 16
  }
}));

type Affect = "inc" | "dec"

export default function AddOnProduct() {
  const [state, setState] = React.useState(0);
  const classes = useStyles();

  const handleUpdateQuantity = (mod: Affect) => {
    if (mod === 'inc') {
      setState((curr) => curr + 1);
    } else if (mod === 'dec' && state > 0) {
      setState((curr) => curr - 1);
    }
  };

  return (
    <Box className={classes.root}>
      <Box>
        <Typography variant="body1" className={classes.text}>Add-on product 1</Typography>
        <Typography variant="body1" className={classes.text}>Description</Typography>
      </Box>
      <Box className={classes.quantityContainer}>
        <IconButton onClick={() => handleUpdateQuantity('dec')} className={classes.iconButton}>
          <RemoveIcon style={{ color: 'orange' }} />
        </IconButton>
        <Card elevation={2} className={classes.ammountCard}>
          <Typography variant="body1" className={classes.text}>{state}</Typography>
        </Card>
        <IconButton onClick={() => handleUpdateQuantity('inc')} className={classes.iconButton}>
          <AddIcon style={{ color: 'green' }} />
        </IconButton>
      </Box>
      <Box>
        <Typography variant="body1" className={classes.text}>$99.00</Typography>
      </Box>
    </Box>
  );
}
