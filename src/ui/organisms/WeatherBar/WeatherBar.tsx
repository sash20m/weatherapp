import React, { useState, useEffect } from 'react';

import './WeatherBar.scss';
import { get5DaysForecast } from '../../../services/Weather.Service';
import DailyForecast from '../../molecules/DailyForecast/DailyForecast';

interface temp {
  max: number;
  min: number;
}

interface weather {
  main: string;
}

export interface forecastData {
  dt: number;
  humidity: number;
  temp: temp;
  weather: weather[];
}

const WeatherBar: React.FC = () => {
  const [forecast, setForecast] = useState<forecastData[] | null>(null);

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
        {forecast && <DailyForecast data={forecast} />}
      </div>
    </div>
  );
};

export default WeatherBar;
