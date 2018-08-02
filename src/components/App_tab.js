import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AppTodoList from './App_todo_list';

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

class App_tab extends React.Component {
	state = {
		value: 0,
		text: '',
		todos: []
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};

	handleChangeIndex = index => {
		this.setState({ value: index });
	};

	handleToggle = value => () => {
		const { todos } = this.state;
		const currentIndex = todos.indexOf(value);

		todos[currentIndex].completed = !todos[currentIndex].completed;
		todos[currentIndex].date = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });

		this.setState({ todos });
	};

	handleInputChange = e => {
		this.setState({ text: e.target.value });
	};

	handleSubmit = () => {
		let key;
		for (let i = 0; i <= this.state.todos.length; i++) {
			key = i;
		}

		let stateCopy = Object.assign({}, this.state);
		stateCopy.todos = stateCopy.todos.slice();
		stateCopy.todos[key] = Object.assign({}, stateCopy.todos[key]);
		stateCopy.todos[key].id = key;
		stateCopy.todos[key].text = this.state.text;
		stateCopy.todos[key].completed = false;
		stateCopy.todos[key].date = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
		this.setState(stateCopy);
		this.props.onHandleFloatButton();
	};

	componentWillReceiveProps(nextProps) {
		if (this.props.onShowInput !== nextProps.onShowInput) {
			this.setState(prevState => {
				return { value: prevState.value * 0 };
			});
		}
	}

	render() {
		const { classes, theme, onShowInput, onHandleFloatButton } = this.props;
		let pending = [...this.state.todos.filter(e => e.completed === false)];
		let complete = [...this.state.todos.filter(e => e.completed === true)];

		return (
			<div className={classes.root}>
				<AppBar position="static" color="inherit">
					<Tabs value={this.state.value} onChange={this.handleChange} indicatorColor="primary" textColor="primary" centered>
						<Tab label="All" />
						<Tab label="Pending" />
						<Tab label="Done" />
					</Tabs>
				</AppBar>
				<SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={this.state.value} onChangeIndex={this.handleChangeIndex}>
					<TabContainer dir={theme.direction}>
						<AppTodoList
							todos={this.state.todos}
							onShowInput={onShowInput}
							tabIndex={this.state.value}
							onHandleFloatButton={onHandleFloatButton}
							onHandleToggle={this.handleToggle}
							onHandleInputChange={this.handleInputChange}
							onHandleSubmit={this.handleSubmit}
						/>
					</TabContainer>
					<TabContainer dir={theme.direction}>
						{this.state.value === 1 && (
							<AppTodoList
								todos={pending}
								onShowInput={onShowInput}
								tabIndex={this.state.value}
								onHandleFloatButton={onHandleFloatButton}
								onHandleToggle={this.handleToggle}
								onHandleInputChange={this.handleInputChange}
								onHandleSubmit={this.handleSubmit}
							/>
						)}
					</TabContainer>
					<TabContainer dir={theme.direction}>
						{this.state.value === 2 && (
							<AppTodoList
								todos={complete}
								onShowInput={onShowInput}
								tabIndex={this.state.value}
								onHandleFloatButton={onHandleFloatButton}
								onHandleToggle={this.handleToggle}
								onHandleInputChange={this.handleInputChange}
								onHandleSubmit={this.handleSubmit}
							/>
						)}
					</TabContainer>
				</SwipeableViews>
			</div>
		);
	}
}

App_tab.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(App_tab);
