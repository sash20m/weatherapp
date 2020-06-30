import React, { useState, useEffect } from 'react';

import dayjs from 'dayjs';
import dayjsPluginUTC from 'dayjs/plugin/utc';
import { HourlyForecast } from '../../organisms/HourlyBar/HourlyBar';

import './HourlyForecastItems.scss';

interface Props {
  day: HourlyForecast;
  index: number;
}

const HourlyForecastItems = ({ day }: Props) => {
  const [data, setData] = useState<HourlyForecast | null>(null);

  const getHour = (date: HourlyForecast) => {
    const dayInfo = date.dt;
    return dayjs.unix(dayInfo).utc().hour();
  };

  useEffect(() => {
    const onSetData = () => {
      setData(day);
    };

    onSetData();
    dayjs.extend(dayjsPluginUTC);
  }, [day]);

  return (
    <>
      {data && (
        <div className="item">
          <p className="item__hour">{`${getHour(data)}:00`}</p>
          <p className="item__temp">{`${data.main.temp}°`}</p>
          <div>
            <img
              className="item__weather"
              src={`./weatherIcons/${data.weather[0].main}.png`}
              alt="Weather"
            />
          </div>
          <p className="item__humidity">{`%${data.main.humidity}`}</p>
          <hr className="item__separator" />
        </div>
      )}
    </>
  );
};

export default HourlyForecastItems;
