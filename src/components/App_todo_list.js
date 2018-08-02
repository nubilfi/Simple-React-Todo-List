import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import AppInput from './App_input';


const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  secondAction: {
    paddingRight: 10,
  }
});

const AppTodoList = ({ classes, onShowInput, tabIndex, onHandleToggle, onHandleInputChange, onHandleSubmit, todos }) => (
  <React.Fragment>
    <List className={classes.root}>
    {
      todos.length !== 0 &&
      todos.map(value => {
        return (
          <React.Fragment key={value.id}>
            <ListItem
              role={undefined}
              dense
              button
              onClick={onHandleToggle(value)}
              className={classes.listItem}
            >
              <Checkbox
                checked={value.completed}
                tabIndex={-1}
                disableRipple
                color="primary"
              />
              <ListItemText
                primary={value.text} 
                style={{textDecoration: value.completed ? 'line-through' : 'none'}}/>
              <ListItemSecondaryAction className={classes.secondAction}>
                {value.date}
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </React.Fragment>
        );
      })
    }
      {
        onShowInput && tabIndex === 0 && 
        <AppInput 
          onShowInput={onShowInput} 
          onHandleChange={onHandleInputChange}
          onHandleSubmit={onHandleSubmit}
          todos={todos} />
      }
    </List>
  </React.Fragment>
);

AppTodoList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppTodoList);
