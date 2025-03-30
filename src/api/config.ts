export const API_CONFIG = {
  API_KEY: import.meta.env.VITE_OPENWEATHER_API_KEY,
  GEO_API_URL: 'https://api.openweathermap.org/geo/1.0',
  WEATHER_API_URL: 'https://api.openweathermap.org/data/2.5',
  DEFAULT_PARAMS: {
    units: 'metric',
    appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
  },
};
