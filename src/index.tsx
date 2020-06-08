import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import Home from './Pages/Home';
import Stat from './Pages/Stat';
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          backgroundColor: '#efefef',
        },
      },
    },
  },
});

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/stat/:user/:repo" component={Stat} />
            </Switch>
          </Router>
      </ThemeProvider>
    );
  }
}



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
