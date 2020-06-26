import React, { useState, useEffect } from 'react';
import './DailyForecastItems.scss';

interface Props {
  day: {
    day: any;
    index: number;
  };
  routsData: any;
}

const DailyForecastItems = ({ day, routsData }: Props) => {
  const [data, setData] = useState<any | null>(null);
  const [key, setKey] = useState<number | null>(null);

  useEffect(() => {
    setData(day.day);
    setKey(day.index);
  }, [day]);

  const pickHourlyForecast = (date: any, position: number) => {
    const newDate = new Date(date.dt * 1000);
    let weekDay = '';
    if (newDate.getDay() === 0) weekDay = 'Sun';
    if (newDate.getDay() === 1) weekDay = 'Mon';
    if (newDate.getDay() === 2) weekDay = 'Tue';
    if (newDate.getDay() === 3) weekDay = 'Wed';
    if (newDate.getDay() === 4) weekDay = 'Thu';
    if (newDate.getDay() === 5) weekDay = 'Fri';
    if (newDate.getDay() === 6) weekDay = 'Sat';
    routsData.history.push({ pathname: `/${weekDay}-forecast`, state: position });
  };

  const getDay = (date: any) => {
    let weekDay = '';
    if (date.getDay() === 0) weekDay = 'Sun';
    if (date.getDay() === 1) weekDay = 'Mon';
    if (date.getDay() === 2) weekDay = 'Tue';
    if (date.getDay() === 3) weekDay = 'Wed';
    if (date.getDay() === 4) weekDay = 'Thu';
    if (date.getDay() === 5) weekDay = 'Fri';
    if (date.getDay() === 6) weekDay = 'Sat';
    const newDate = date.getDate();

    return `${newDate} ${weekDay}`;
  };

  return (
    <>
      {data && key !== null && (
        <div
          className="weather-data__item"
          onClick={() => pickHourlyForecast(data, key)}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
        >
          <p className="weather-data__item__day">
            {getDay(new Date(data.dt * 1000))}
          </p>
          <p className="weather-data__item__highest-temp">
            {`${Math.round(data.temp.max)}°`}
          </p>
          <p className="weather-data__item__lowest-temp">
            {`${Math.round(data.temp.min)}°`}
          </p>
          <div>
            {/* rain, clouds, clear, Rain, Snow, Extreme */}
            <img
              className="weather-data__item__weather"
              src={`./weatherIcons/${data.weather[0].main}.png`}
              alt="Weather"
            />
          </div>
          <p className="weather-data__item__humidity">{`%${data.humidity}`}</p>
          <hr className="weather-data__separator" />
        </div>
      )}
    </>
  );
};


export default DailyForecastItems;
