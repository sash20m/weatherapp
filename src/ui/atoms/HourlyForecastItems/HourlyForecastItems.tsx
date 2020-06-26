import React, { useState, useEffect } from 'react';
import './HourlyForecastItems.scss';

interface Props {
  day: any;
  index: number;
}

const HourlyForecastItems = ({ day }: Props) => {
  const [data, setData] = useState<any | null>(null);

  const getHour = (date: any) => {
    return new Date(date * 1000).getUTCHours();
  };

  useEffect(() => {
    setData(day);
  }, [day]);

  return (
    <>
      {data && (
        <div className="item">
          <p className="item__hour">{`${getHour(data.dt)}:00`}</p>
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
