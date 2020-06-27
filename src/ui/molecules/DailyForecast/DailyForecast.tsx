import React, { useState, useEffect } from 'react';
import './DailyForecast.scss';
import DailyForecastItems from '../../atoms/DailyForecastItems/DailyForecastItems';
import { forecastData } from '../../organisms/WeatherBar/WeatherBar';

interface Props {
  data: forecastData[];
}

const DailyForecast = ({ data }: Props) => {
  const [forecast, setForecast] = useState<forecastData[] | null>(null);

  useEffect(() => {
    setForecast(data);
  }, [data]);

  return (
    <div className="weather-data">
      {forecast &&
        forecast.map((day: forecastData, key: number) => (
          <DailyForecastItems dayData={{ day, index: key }} key={day.dt} />
        ))}
    </div>
  );
};

export default DailyForecast;
