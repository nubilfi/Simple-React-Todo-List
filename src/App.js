import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import AppBar from './components/App_bar';
import AppTab from './components/App_tab';
import AppFloatButton from './components/App_float_button';

const theme = createMuiTheme({
	palette: {
		primary: teal
	}
});

const App = () => (
	<MuiThemeProvider theme={theme}>
		<AppBar />
		<AppTab />
		<AppFloatButton />
	</MuiThemeProvider>
);

export default App;
