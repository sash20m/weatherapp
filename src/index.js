import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import WeatherBar from './ui/organisms/WeatherBar/WeatherBar';
import HourlyBar from './ui/organisms/HourlyBar/HourlyBar';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/5-days-forecast" component={WeatherBar} />
        <Route path="/:id" component={HourlyBar} />
        <Redirect from="/" exact to="5-days-forecast" />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
