import React, { useState, useEffect } from 'react';
import './HourlyForecast.scss';
import HourlyForecastItems from '../../atoms/HourlyForecastItems/HourlyForecastItems';

function HourlyForecast(props) {
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    setPosition(props.location.state);
    setHourlyForecast(props.data);
  }, [props]);

  return (
    <div className="weather-data">
      {hourlyForecast &&
        hourlyForecast[position].map((day, key) => (
          <HourlyForecastItems day={day} key={key} />
        ))}
    </div>
  );
}

export default HourlyForecast;
