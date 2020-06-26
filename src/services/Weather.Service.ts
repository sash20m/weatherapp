import axios from 'axios';

const ACCESS_KEY = '886705b4c1182eb1c69f28eb8c520e20';

/**
 *
 */
export const get5DaysForecast: any = () => {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast/daily?q=Chisinau&cnt=5&units=metric&appid=${ACCESS_KEY}`
    )
    .then((response) => response.data);
};

/**
 *
 * @param {string} id
 */
export const getHourlyForecast: any = () => {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast?id=524901&units=metric&appid=${ACCESS_KEY}`
    )
    .then((response) => response.data);
};

export default { get5DaysForecast, getHourlyForecast };
