import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import AppBar from './components/App_bar';
import AppTab from './components/App_tab';
import AppFloatButton from './components/App_float_button';

const theme = createMuiTheme({
  palette: {
    primary: teal,
  },
});

class App extends React.Component {
  state = {
    showInput: false,
  }

  handleFloatButton = () => {
    this.setState(prevState => ({
      showInput: !prevState.showInput
    }));
  }

  render() {
    const { showInput } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <AppBar />
        <AppTab 
          onShowInput={showInput}
          onHandleFloatButton={this.handleFloatButton}/>
        <AppFloatButton 
          onShowInput={showInput}
          onHandleFloatButton={this.handleFloatButton}/>
      </MuiThemeProvider>
    )
  }
}


export default App;
