import React, { useState, useEffect } from 'react';
import './HourlyForecastItems.scss';

function HourlyForecastItems(props) {
  const [day, setDay] = useState(null);

  const getHour = (data) => {
    return new Date(data * 1000).getUTCHours();
  };

  useEffect(() => {
    setDay(props.day);
  }, [props]);

  return (
    <React.Fragment>
      {day && (
        <div className="item">
          <p className="item__hour">{`${getHour(day.dt)}:00`}</p>
          <p className="item__temp">{`${day.main.temp}°`}</p>
          <div>
            <img
              className="item__weather"
              src={`./weatherIcons/${day.weather[0].main}.png`}
              alt="Weather"
            />
          </div>
          <p className="item__humidity">{`%${day.main.humidity}`}</p>
          <hr className="item__separator" />
        </div>
      )}
    </React.Fragment>
  );
}

export default HourlyForecastItems;
