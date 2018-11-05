import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { showFab } from '../actions/todoActions';

const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
		position: 'absolute',
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 2
	}
});

class AppFloatButton extends Component {
	handleFab = () => {
		this.props.showFab();
	};

	render() {
		const { classes, isShow } = this.props;
		return (
			<div>
				{isShow ? (
					<Button
						variant="fab"
						color="primary"
						aria-label="Add"
						className={classes.button}
						onClick={this.handleFab}
					>
						<CancelIcon />
					</Button>
				) : (
					<Button
						variant="fab"
						color="primary"
						aria-label="Add"
						className={classes.button}
						onClick={this.handleFab}
					>
						<AddIcon />
					</Button>
				)}
			</div>
		);
	}
}

AppFloatButton.propTypes = {
	classes: PropTypes.object.isRequired,
	showFab: PropTypes.func.isRequired,
	isShow: PropTypes.bool
};

const mapStateToProps = state => ({
	isShow: state.todo.onShowInput
});

export default compose(
	connect(
		mapStateToProps,
		{ showFab }
	),
	withStyles(styles)
)(AppFloatButton);
