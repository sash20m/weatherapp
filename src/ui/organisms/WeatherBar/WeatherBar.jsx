import React, { useState, useEffect } from 'react';
import './WeatherBar.scss';
import { get5DaysForecast } from '../../../services/Weather.Service';
import DailyForecast from '../../molecules/DailyForecast/DailyForecast';

function WeatherBar(props) {
  const [forecast, setForecast] = useState();

  const getData = async () => {
    const { list } = await get5DaysForecast();
    setForecast(list);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="content">
      <div className="weather-bar">
        <p className="weather-bar__title">Daily Forecast</p>
        {forecast && <DailyForecast data={forecast} history={props.history} />}
      </div>
    </div>
  );
}

export default WeatherBar;
