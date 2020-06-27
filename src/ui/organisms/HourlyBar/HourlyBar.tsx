import './HourlyBar.scss';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';

import { getHourlyForecast } from '../../../services/Weather.Service';
import HourlyForecast from '../../molecules/HourlyForecast/HourlyForecast';

interface hour {
  dt: number; // unix timestamp
}

interface main {
  temp: number;
  humidity: number;
}

interface weather {
  main: string;
}
export interface hourlyForecast {
  dt: number;
  main: main;
  weather: weather[];
}

const HourlyBar: React.FC = () => {
  const [hourlyForecast, setHourlyForecast] = useState<
    hourlyForecast[][] | null
  >(null);
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      const { list } = await getHourlyForecast();
      let index: number = 0;
      let oldDate = dayjs.unix(list[0].dt).date();
      let hours: hourlyForecast[] = [];
      const days: hourlyForecast[][] = [];
      list.forEach((hour: hourlyForecast) => {
        if (dayjs.unix(hour.dt).date() === oldDate) {
          hours.push(hour);
          days[index] = hours;
        } else {
          oldDate = dayjs.unix(hour.dt).date();
          hours.push(hour);
          days[index] = hours;
          hours = [];
          index += 1;
        }
      });

      setHourlyForecast(days);
    };
    getData();
  }, []);

  const goBack = () => history.push('/5-days-forecast');

  return (
    <div className="content">
      <button className="content__button" type="button" onClick={goBack}>
        GO BACK
      </button>
      <div className="hourly-bar">
        <p className="hourly-bar__title">Hourly Forecast</p>
        {hourlyForecast && <HourlyForecast data={hourlyForecast} />}
      </div>
    </div>
  );
};

export default HourlyBar;
