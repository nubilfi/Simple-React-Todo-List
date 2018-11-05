import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { compose } from 'redux';
import AppTodoList from './App_todo_list';
import {
	showPending, showComplete, showAll, markTodo
} from '../actions/todoActions';

function TabContainer({ children, dir }) {
	return (
		<Typography component="div" dir={dir} style={{ paddingTop: 3 }}>
			{children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
	dir: PropTypes.string.isRequired
};

const styles = theme => ({
	root: {
		backgroundColor: theme.palette.background.paper
	}
});

class AppTab extends React.Component {
	state = {
		value: 0
	};

	handleTabsChange = (event, value) => {
		if (value === 1) {
			this.props.showPending();
			this.setState({ value });
		} else if (value === 2) {
			this.props.showComplete();
			this.setState({ value });
		} else {
			this.props.showAll();
			this.setState({ value });
		}
	};

	handleChangeIndex = (index) => {
		this.setState({ value: index });
	};

	handleToggle = value => () => {
		this.props.markTodo(value);
	};

	componentWillReceiveProps(nextProps) {
		if (this.props.isShow !== nextProps.isShow) {
			this.setState(prevState => ({ value: prevState.value * 0 }));
		}
	}

	render() {
		const { classes, theme } = this.props;

		return (
			<div className={classes.root}>
				<AppBar position="static" color="inherit">
					<Tabs
						value={this.state.value}
						onChange={this.handleTabsChange}
						indicatorColor="primary"
						textColor="primary"
						centered
					>
						<Tab label="All" />
						<Tab label="Pending" />
						<Tab label="Done" />
					</Tabs>
				</AppBar>
				<SwipeableViews
					axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
					index={this.state.value}
					onChangeIndex={this.handleChangeIndex}
				>
					<TabContainer dir={theme.direction}>
						<AppTodoList tabIndex={this.state.value} onHandleToggle={this.handleToggle} />
					</TabContainer>

					<TabContainer dir={theme.direction}>
						{this.state.value === 1 && (
							<AppTodoList
								tabIndex={this.state.value}
								onHandleToggle={this.handleToggle}
							/>
						)}
					</TabContainer>

					<TabContainer dir={theme.direction}>
						{this.state.value === 2 && (
							<AppTodoList
								tabIndex={this.state.value}
								onHandleToggle={this.handleToggle}
							/>
						)}
					</TabContainer>
				</SwipeableViews>
			</div>
		);
	}
}

AppTab.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
	isShow: PropTypes.bool,
	showAll: PropTypes.func.isRequired,
	markTodo: PropTypes.func.isRequired,
	showPending: PropTypes.func.isRequired,
	showComplete: PropTypes.func.isRequired,
	todos: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			text: PropTypes.string.isRequired,
			date: PropTypes.string.isRequired,
			completed: PropTypes.bool.isRequired
		}).isRequired
	)
};

export default compose(
	connect(
		null,
		{
			showPending,
			showComplete,
			showAll,
			markTodo
		}
	),
	withStyles(styles, { withTheme: true })
)(AppTab);
