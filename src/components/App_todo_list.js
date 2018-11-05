import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import { compose } from 'redux';
import { connect } from 'react-redux';
import AppInput from './App_input';

const styles = theme => ({
	root: {
		backgroundColor: theme.palette.background.paper
	},
	secondAction: {
		paddingRight: 10
	}
});

class AppTodoList extends React.Component {
	render() {
		const {
			classes, onHandleToggle, isShow, tabIndex, todolist
		} = this.props;
		return (
			<React.Fragment>
				<List className={classes.root}>
					{todolist
						&& todolist.map(value => (
							<React.Fragment key={value.id}>
								<ListItem
									role={undefined}
									dense
									button
									className={classes.listItem}
									onClick={onHandleToggle(value)}
								>
									<Checkbox
										checked={value.completed}
										tabIndex={-1}
										disableRipple
										color="primary"
									/>
									<ListItemText
										primary={value.text}
										style={{
											textDecoration: value.completed ? 'line-through' : 'none'
										}}
									/>
									<ListItemSecondaryAction className={classes.secondAction}>
										{value.date}
									</ListItemSecondaryAction>
								</ListItem>
								<Divider />
							</React.Fragment>
						))}
					{isShow && tabIndex === 0 && <AppInput todo={todolist} />}
				</List>
			</React.Fragment>
		);
	}
}

const getVisibleTodos = (todos, filter) => {
	switch (filter) {
	case 'SHOW_COMPLETE':
		return todos.filter(t => t.completed);
	case 'SHOW_PENDING':
		return todos.filter(t => !t.completed);
	case 'SHOW_ALL':
	default:
		return todos;
	}
};

AppTodoList.propTypes = {
	classes: PropTypes.object.isRequired,
	onHandleToggle: PropTypes.func.isRequired,
	isShow: PropTypes.bool,
	tabIndex: PropTypes.number.isRequired,
	todolist: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	isShow: state.todo.onShowInput,
	todolist: getVisibleTodos(state.todo.todos, state.todo.action)
});

export default compose(
	connect(mapStateToProps),
	withStyles(styles)
)(AppTodoList);
