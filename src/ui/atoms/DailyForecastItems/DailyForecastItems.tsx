import React, { useState, useEffect } from 'react';
import './DailyForecastItems.scss';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';
import { forecastData } from '../../organisms/WeatherBar/WeatherBar';

interface day {
  day: forecastData;
  index: number;
}
interface Props {
  dayData: day;
}

const DailyForecastItems = ({ dayData }: Props) => {
  const [data, setData] = useState<forecastData | null>(null);
  const [key, setKey] = useState<number | null>(null);
  const history = useHistory();

  useEffect(() => {
    setData(dayData.day);
    setKey(dayData.index);
  }, [dayData]);

  const pickHourlyForecast = (date: forecastData, position: number) => {
    const newDate = dayjs.unix(date.dt).toDate();

    let weekDay = '';
    if (newDate.getDay() === 0) weekDay = 'Sun';
    if (newDate.getDay() === 1) weekDay = 'Mon';
    if (newDate.getDay() === 2) weekDay = 'Tue';
    if (newDate.getDay() === 3) weekDay = 'Wed';
    if (newDate.getDay() === 4) weekDay = 'Thu';
    if (newDate.getDay() === 5) weekDay = 'Fri';
    if (newDate.getDay() === 6) weekDay = 'Sat';

    history.push(`/${weekDay}-forecast`, { position });
  };

  const getDay = (forecast: forecastData) => {
    const date = dayjs.unix(forecast.dt);
    let weekDay = '';

    if (date.day() === 0) weekDay = 'Sun';
    if (date.day() === 1) weekDay = 'Mon';
    if (date.day() === 2) weekDay = 'Tue';
    if (date.day() === 3) weekDay = 'Wed';
    if (date.day() === 4) weekDay = 'Thu';
    if (date.day() === 5) weekDay = 'Fri';
    if (date.day() === 6) weekDay = 'Sat';
    const newDate = date.date();

    return `${newDate} ${weekDay}`;
  };

  return (
    <>
      {data && key !== null && (
        <button
          className="item"
          onClick={() => pickHourlyForecast(data, key)}
          type="button"
        >
          <p className="item__day">{getDay(data)}</p>
          <p className="item__highest-temp">
            {`${Math.round(data.temp.max)}°`}
          </p>
          <p className="item__lowest-temp">{`${Math.round(data.temp.min)}°`}</p>
          <div>
            <img
              className="item__weather"
              src={`./weatherIcons/${data.weather[0].main}.png`}
              alt="Weather"
            />
          </div>
          <p className="item__humidity">{`%${data.humidity}`}</p>
          <hr className="item__separator" />
        </button>
      )}
    </>
  );
};

export default DailyForecastItems;
