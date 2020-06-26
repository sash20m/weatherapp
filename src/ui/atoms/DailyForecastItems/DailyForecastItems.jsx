import React, { useState, useEffect } from 'react';
import './DailyForecastItems.scss';

function DailyForecastItems(props) {
  const [day, setDay] = useState();
  const [key, setKey] = useState();

  useEffect(() => {
    setDay(props.day.day);
    setKey(props.day.key);
  }, [props]);

  const pickHourlyForecast = (day, key) => {
    const data = new Date(day.dt * 1000);
    let weekDay = '';
    if (data.getDay() === 0) weekDay = 'Sun';
    if (data.getDay() === 1) weekDay = 'Mon';
    if (data.getDay() === 2) weekDay = 'Tue';
    if (data.getDay() === 3) weekDay = 'Wed';
    if (data.getDay() === 4) weekDay = 'Thu';
    if (data.getDay() === 5) weekDay = 'Fri';
    if (data.getDay() === 6) weekDay = 'Sat';
    props.history.push({ pathname: `/${weekDay}-forecast`, state: key });
  };

  const getDay = (data) => {
    let weekDay = '';
    if (data.getDay() === 0) weekDay = 'Sun';
    if (data.getDay() === 1) weekDay = 'Mon';
    if (data.getDay() === 2) weekDay = 'Tue';
    if (data.getDay() === 3) weekDay = 'Wed';
    if (data.getDay() === 4) weekDay = 'Thu';
    if (data.getDay() === 5) weekDay = 'Fri';
    if (data.getDay() === 6) weekDay = 'Sat';
    const date = data.getDate();

    return `${date} ${weekDay}`;
  };

  return (
    <React.Fragment>
      {day && (
        <div
          className="weather-data__item"
          onClick={() => pickHourlyForecast(day, key)}
        >
          <p className="weather-data__item__day">
            {getDay(new Date(day.dt * 1000))}
          </p>
          <p className="weather-data__item__highest-temp">
            {`${Math.round(day.temp.max)}°`}
          </p>
          <p className="weather-data__item__lowest-temp">
            {`${Math.round(day.temp.min)}°`}
          </p>
          <div>
            {/* rain, clouds, clear, Rain, Snow, Extreme */}
            <img
              className="weather-data__item__weather"
              src={`./weatherIcons/${day.weather[0].main}.png`}
              alt="Weather"
            />
          </div>
          <p className="weather-data__item__humidity">{`%${day.humidity}`}</p>
          <hr className="weather-data__separator" />
        </div>
      )}
    </React.Fragment>
  );
}

export default DailyForecastItems;
