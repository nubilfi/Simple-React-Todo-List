import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Zoom from '@material-ui/core/Zoom';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing.unit,
  },
});

const Inputs = ({ classes, onShowInput, todos, onHandleChange, onHandleSubmit }) => {
  return (
    <div className={classes.container}>
      <Zoom in={onShowInput}>
        <ListItem dense>
          <IconButton aria-label="Submit" onClick={() => { onHandleSubmit() }}>
            <CheckIcon />
          </IconButton>
          <Input
            value={todos.text}
            onChange={onHandleChange}
            placeholder="New todo"
            className={classes.input}
            inputProps={{
              'aria-label': 'New todo',
            }}
            fullWidth
          />
        </ListItem>
      </Zoom>
    </div>
  );
}

Inputs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inputs);
