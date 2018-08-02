import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

const AppFloatButton = ({ classes, onHandleFloatButton, onShowInput }) => {
  return (
    <div>
      {
        onShowInput ?
        (<Button variant="fab" color="primary" aria-label="Add" className={classes.button} onClick={onHandleFloatButton}>
          <CancelIcon />
        </Button>) : 
        (<Button variant="fab" color="primary" aria-label="Add" className={classes.button} onClick={onHandleFloatButton}>
          <AddIcon />
        </Button>) 
      }
    </div>
  );
}

AppFloatButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppFloatButton);
