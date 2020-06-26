import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import './HourlyBar.scss';
import { getHourlyForecast } from '../../../services/Weather.Service';
import HourlyForecast from '../../molecules/HourlyForecast/HourlyForecast';


interface Props extends RouteComponentProps<any> {}

const HourlyBar = ({ location, history }: Props) => {
  const [hourlyForecast, setHourlyForecast] = useState<Array<{}> | null>(null);

  useEffect(() => {
    const getData = async () => {
      const { list } = await getHourlyForecast();
      let index: number = 0;
      let oldDate = new Date(list[0].dt * 1000).getDate();
      let hours: any = [];
      const days: any = [];
      list.forEach((hour: any) => {
        if (new Date(hour.dt * 1000).getDate() === oldDate) {
          hours.push(hour);
          days[index] = hours;
        } else {
          oldDate = new Date(hour.dt * 1000).getDate();
          hours.push(hour);
          days[index] = hours;
          hours = [];
          index+=1;
        }
      });
      setHourlyForecast(days);
    };
    getData();
  }, []);

  const goBack = () => {
    history.push({ pathname: '/5-days-forecast' });
  };

  return (
    <div className="content">
      <button type="button" onClick={goBack}>GO BACK</button>
      <div className="hourly-bar">
        <p className="hourly-bar__title">Hourly Forecast</p>
        {hourlyForecast && (
          <HourlyForecast data={hourlyForecast} location={location} />
        )}
      </div>
    </div>
  );
};

export default HourlyBar;
