import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import './WeatherBar.scss';
import { get5DaysForecast } from '../../../services/Weather.Service';
import DailyForecast from '../../molecules/DailyForecast/DailyForecast';

interface Props extends RouteComponentProps<any> {}

const WeatherBar = (history: Props) => {
  const [forecast, setForecast] = useState<any[] | null>(null);
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
        {forecast && <DailyForecast data={forecast} routsData={history} />}
      </div>
    </div>
  );
};

export default WeatherBar;
