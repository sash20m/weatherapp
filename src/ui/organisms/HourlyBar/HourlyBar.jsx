import React, { useState, useEffect } from 'react';
import './HourlyBar.scss';
import { getHourlyForecast } from '../../../services/Weather.Service';
import HourlyForecast from '../../molecules/HourlyForecast/HourlyForecast';

function HourlyBar(props) {
  const [hourlyForecast, setHourlyForecast] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const { list } = await getHourlyForecast();
      let index = 0;
      let oldDate = new Date(list[0].dt * 1000).getDate();
      let hours = [];
      let days = [];
      list.forEach((hour, key) => {
        if (new Date(hour.dt * 1000).getDate() === oldDate) {
          hours.push(hour);
          days[index] = hours;
        } else {
          oldDate = new Date(hour.dt * 1000).getDate();
          hours.push(hour);
          days[index] = hours;
          hours = [];
          index++;
        }
      });
      setHourlyForecast(days);
    };
    getData();
  }, []);

  const goBack = () => {
    props.history.push({ pathname: '/5-days-forecast' });
  };

  return (
    <div className="content">
      <button onClick={goBack}>GO BACK</button>
      <div className="hourly-bar">
        <p className="hourly-bar__title">Hourly Forecast</p>
        {hourlyForecast && (
          <HourlyForecast data={hourlyForecast} location={props.location} />
        )}
      </div>
    </div>
  );
}

export default HourlyBar;
