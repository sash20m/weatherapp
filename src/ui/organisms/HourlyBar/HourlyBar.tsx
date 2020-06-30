import './HourlyBar.scss';
import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import { getHourlyForecast } from '../../../services/Weather.Service';
import HourForecast from '../../molecules/HourlyForecast/HourlyForecast';
import Spinner from '../../atoms/Spinner/Spinner';

interface Main {
  temp: number;
  humidity: number;
}

interface Weather {
  main: string;
}
export interface HourlyForecast {
  dt: number;
  main: Main;
  weather: Weather[];
}

const HourlyBar: React.FC = () => {
  const [hourlyForecast, setHourlyForecast] = useState<
    HourlyForecast[][] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);

  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      const { list } = await getHourlyForecast();
      let index: number = 0;
      let oldDate = dayjs.unix(list[0].dt).date();
      let hours: HourlyForecast[] = [];
      const days: HourlyForecast[][] = [];
      list.forEach((hour: HourlyForecast) => {
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
      setLoading(false);
    };
    getData();
  }, []);

  const goBack = () => history.push('/5-days-forecast');

  if (loading) return <Spinner />;

  return (
    <div className="content">
      <button className="content__button" type="button" onClick={goBack}>
        GO BACK
      </button>
      <div className="hourly-bar">
        <p className="hourly-bar__title">Hourly Forecast</p>
        {hourlyForecast && <HourForecast data={hourlyForecast} />}
      </div>
    </div>
  );
};

export default HourlyBar;
