import React, { useState, useEffect } from 'react';

import { get5DaysForecast } from '../../../services/Weather.Service';
import DailyForecast from '../../molecules/DailyForecast/DailyForecast';

import './WeatherBar.scss';
import Spinner from '../../atoms/Spinner/Spinner';

interface Temp {
  max: number;
  min: number;
}

interface Weather {
  main: string;
}

export interface ForecastData {
  dt: number;
  humidity: number;
  temp: Temp;
  weather: Weather[];
}

const WeatherBar: React.FC = () => {
  const [forecast, setForecast] = useState<ForecastData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      const { list } = await get5DaysForecast();
      setForecast(list);
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) return <Spinner />;

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
