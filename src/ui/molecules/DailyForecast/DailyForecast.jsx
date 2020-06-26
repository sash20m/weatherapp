import React, { useState, useEffect } from 'react';
import './DailyForecast.scss';
import DailyForecastItems from '../../atoms/DailyForecastItems/DailyForecastItems';

function DailyForecast(props) {
  const [forecast, setForecast] = useState();

  useEffect(() => {
    setForecast(props.data);
  }, [props]);

  return (
    <div className="weather-data">
      {forecast &&
        forecast.map((day, key) => (
          <DailyForecastItems day={{ day, key }} history={props.history} />
        ))}
    </div>
  );
}

export default DailyForecast;
