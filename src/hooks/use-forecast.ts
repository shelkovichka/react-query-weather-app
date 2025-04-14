import {useMemo} from 'react';
import {format} from 'date-fns';

import {ForecastData} from '@/api/types';

interface Forecast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

export function useForecastData(data: ForecastData) {
  return useMemo(() => {
    const dailyForecasts = data.list.reduce((acc, forecast) => {
      const date = format(new Date(forecast.dt * 1000), 'yyyy-MM-dd');

      if (!acc[date]) {
        acc[date] = {
          temp_min: forecast.main.temp_min,
          temp_max: forecast.main.temp_max,
          humidity: forecast.main.humidity,
          wind: forecast.wind.speed,
          weather: forecast.weather[0],
          date: forecast.dt,
        };
      } else {
        acc[date].temp_min = Math.min(
            acc[date].temp_min,
            forecast.main.temp_min,
        );
        acc[date].temp_max = Math.max(
            acc[date].temp_max,
            forecast.main.temp_max,
        );

        acc[date].humidity = Math.round(
            (acc[date].humidity + forecast.main.humidity) / 2,
        );
        acc[date].wind = parseFloat(
            ((acc[date].wind + forecast.wind.speed) / 2).toFixed(2),
        );
      }

      return acc;
    }, {} as Record<string, Forecast>);

    return {
      dailyForecasts,
      nextDays: Object.values(dailyForecasts).slice(0, 6),
    };
  }, [data.list]);
}
