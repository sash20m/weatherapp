import React, { useState, useEffect } from 'react';
import './DailyForecast.scss';
import DailyForecastItems from '../../atoms/DailyForecastItems/DailyForecastItems';

interface Props {
  data: any[];
  routsData: any;
}

const DailyForecast = ({ data, routsData }: Props) => {
  const [forecast, setForecast] = useState<any[] | null>(null);

  useEffect(() => {
    setForecast(data);
  }, [data]);

  return (
    <div className="weather-data">
      {forecast &&
        forecast.map((day: any, key: number) => (
          <DailyForecastItems day={{ day, index: key }} routsData={routsData} />
        ))}
    </div>
  );
};

export default DailyForecast;
