import './HourlyForecast.scss';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HourlyForecastItems from '../../atoms/HourlyForecastItems/HourlyForecastItems';
import { hourlyForecast } from '../../organisms/HourlyBar/HourlyBar';

interface Props {
  data: hourlyForecast[][];
}

const HourlyForecast = ({ data }: Props) => {
  const [hourForecast, setHourForecast] = useState<hourlyForecast[][] | null>(
    null
  );
  const [position, setPosition] = useState<number>(0);
  const location = useLocation();

  useEffect(() => {
    setPosition(location.state.position);
    setHourForecast(data);
  }, [data, location]);

  return (
    <div className="weather-data">
      {hourForecast &&
        hourForecast[position].map((day: any, key: number) => (
          <HourlyForecastItems day={day} index={key} key={day.dt} />
        ))}
    </div>
  );
};

export default HourlyForecast;
