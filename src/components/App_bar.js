import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
	root: {
		flexGrow: 1
	},
	flex: {
		flexGrow: 1,
		paddingTop: 10
	},
	navDate: {
		marginLeft: -4,
		fontSize: 30,
		paddingRight: 5
	}
};

const Appbar = ({ classes }) => {
	const date = new Date();
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	const days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	];

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<span color="inherit" className={classes.navDate}>
						{date.getDate()}
					</span>

					<Typography variant="title" color="inherit" className={classes.flex}>
						{months[date.getMonth()]}
						<Typography color="inherit" gutterBottom noWrap>
							{date.getFullYear()}
						</Typography>
					</Typography>

					<Typography variant="title" color="inherit">
						{days[date.getDay()]}
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
};

Appbar.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Appbar);
