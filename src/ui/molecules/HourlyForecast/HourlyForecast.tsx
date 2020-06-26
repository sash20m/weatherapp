import React, { useState, useEffect } from 'react';

import './HourlyForecast.scss';
import HourlyForecastItems from '../../atoms/HourlyForecastItems/HourlyForecastItems';

interface Props {
  data: Array<{}>;
  location: any;
}
const HourlyForecast = ({ location, data }: Props) => {
  const [hourlyForecast, setHourlyForecast] = useState<any[] | null>(null);
  const [position, setPosition] = useState<number | null>(null);

  useEffect(() => {
    setPosition(location.state);
    setHourlyForecast(data);
  }, [data, location.state]);

  return (
    <div className="weather-data">
      {hourlyForecast &&
        position !== null &&
        hourlyForecast[position].map((day: any, key: number) => (
          <HourlyForecastItems day={day} index={key} />
        ))}
    </div>
  );
};

export default HourlyForecast;
