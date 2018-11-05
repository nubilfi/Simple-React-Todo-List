import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Zoom from '@material-ui/core/Zoom';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { addTodo, showFab } from '../actions/todoActions';

const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	input: {
		margin: theme.spacing.unit
	}
});

class Inputs extends Component {
	state = {
		text: ''
	};

	handleInputChange = (e) => {
		this.setState({ text: e.target.value });
	};

	handleSubmit = () => {
		const { todos } = this.props;
		const newTodo = {
			id: todos.length + 1,
			text: this.state.text,
			completed: false,
			date: new Date().toLocaleTimeString('en-US', {
				hour: 'numeric',
				minute: 'numeric'
			})
		};

		this.props.addTodo(newTodo);
		this.props.showFab();
		this.setState({ text: '' });
	};

	render() {
		const { classes, isShow } = this.props;

		return (
			<div className={classes.container}>
				<Zoom in={isShow}>
					<ListItem dense>
						<IconButton
							aria-label="Submit"
							onClick={() => {
								this.handleSubmit();
							}}
						>
							<CheckIcon />
						</IconButton>
						<Input
							value={this.state.text}
							onChange={this.handleInputChange}
							placeholder="New todo"
							className={classes.input}
							inputProps={{
								'aria-label': 'New todo'
							}}
							fullWidth
						/>
					</ListItem>
				</Zoom>
			</div>
		);
	}
}

Inputs.propTypes = {
	classes: PropTypes.object.isRequired,
	addTodo: PropTypes.func.isRequired,
	showFab: PropTypes.func.isRequired,
	isShow: PropTypes.bool,
	todos: PropTypes.array
};

const mapStateToProps = state => ({
	todos: state.todo.todos,
	isShow: state.todo.onShowInput
});

export default compose(
	connect(
		mapStateToProps,
		{ addTodo, showFab }
	),
	withStyles(styles)
)(Inputs);
