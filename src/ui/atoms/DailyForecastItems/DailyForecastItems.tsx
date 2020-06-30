import React, { useState, useEffect, useCallback, useMemo } from 'react';

import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';
import { ForecastData } from '../../organisms/WeatherBar/WeatherBar';

import './DailyForecastItems.scss';

interface Day {
  day: ForecastData;
  index: number;
}
interface Props {
  dayData: Day;
}

const DailyForecastItems = ({ dayData }: Props) => {
  const [data, setData] = useState<ForecastData | null>(null);
  const [key, setKey] = useState<number | null>(null);
  const history = useHistory();

  useEffect(() => {
    setData(dayData.day);
    setKey(dayData.index);
  }, [dayData]);

  const pickHourlyForecast = useCallback(
    (date: ForecastData, position: number) => () => {
      const newDate = dayjs.unix(date.dt).day();

      let weekDay = '';
      if (newDate === 0) weekDay = 'Sun';
      if (newDate === 1) weekDay = 'Mon';
      if (newDate === 2) weekDay = 'Tue';
      if (newDate === 3) weekDay = 'Wed';
      if (newDate === 4) weekDay = 'Thu';
      if (newDate === 5) weekDay = 'Fri';
      if (newDate === 6) weekDay = 'Sat';

      history.push(`/${weekDay}-forecast`, { position });
    },
    [history]
  );

  const getDay = useMemo(
    () => (forecast: ForecastData) => {
      const newDate = dayjs.unix(forecast.dt).date();
      const date = dayjs.unix(forecast.dt).day();

      let weekDay = '';
      if (date === 0) weekDay = 'Sun';
      if (date === 1) weekDay = 'Mon';
      if (date === 2) weekDay = 'Tue';
      if (date === 3) weekDay = 'Wed';
      if (date === 4) weekDay = 'Thu';
      if (date === 5) weekDay = 'Fri';
      if (date === 6) weekDay = 'Sat';

      return `${newDate} ${weekDay}`;
    },
    []
  );

  const mathRound = useMemo(
    () => (temp: number) => {
      return Math.round(temp);
    },
    []
  );

  if (!data || key === null) return null;

  return (
    <button
      className="item"
      onClick={pickHourlyForecast(data, key)}
      type="button"
    >
      <p className="item__day">{getDay(data)}</p>
      <p className="item__highest-temp">{`${mathRound(data.temp.max)}°`}</p>
      <p className="item__lowest-temp">{`${mathRound(data.temp.min)}°`}</p>
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
  );
};

export default DailyForecastItems;
