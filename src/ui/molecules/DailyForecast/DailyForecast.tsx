import React, { useState, useEffect } from 'react';

import DailyForecastItems from 'ui/atoms/DailyForecastItems/DailyForecastItems';
import { ForecastData } from 'ui/organisms/WeatherBar/WeatherBar';

import './DailyForecast.scss';

interface Props {
  data: ForecastData[];
}

const DailyForecast = ({ data }: Props) => {
  const [forecast, setForecast] = useState<ForecastData[] | null>(null);

  useEffect(() => {
    setForecast(data);
  }, [data]);

  return (
    <div className="weather-data">
      {forecast &&
        forecast.map((day: ForecastData, key: number) => (
          <DailyForecastItems dayData={{ day, index: key }} key={day.dt} />
        ))}
    </div>
  );
};

export default DailyForecast;
