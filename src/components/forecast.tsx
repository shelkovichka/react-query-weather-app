import React from 'react';
import {format} from 'date-fns';
import {ArrowDown, Droplets, Wind} from 'lucide-react';

import {ForecastData} from '@/api/types';
import {Card, CardContent} from '@/components/ui/card.tsx';
import WeatherAnimation from '@/components/weather-animation';

interface ForecastProps {
  data: ForecastData;
}

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

const Forecast: React.FC<ForecastProps> = ({data}) => {
  const dailyForecasts = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), 'yyy-MM-dd');

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
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }

    return acc;
  }, {} as Record<string, Forecast>);

  const nextDays = Object.values(dailyForecasts).slice(0, 6);

  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  return (
    <div className="xl:flex gap-4 overflow-x-hidden w-full">
      {nextDays.map((day) => {
        return (
          <Card key={day.date} className="pt-6 min-w-40 align-center">
            <CardContent
              className="grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-none
                xl:flex-col items-center gap-2"
            >
              <div>
                <p className="font-medium">
                  {format(new Date(day.date * 1000), 'EEE, MMM d')}
                </p>
                <p
                  className="text-sm text-muted-foreground capitalize
                    sm:whitespace-nowrap"
                >
                  {day.weather.description}
                </p>
              </div>

              <div className="hidden sm:flex justify-center">
                <WeatherAnimation
                  iconCode={day.weather.icon}
                  className="h-20 w-20"
                />
              </div>

              <div className="sm:flex gap-2">
                <span className="flex text-blue-500">
                  <ArrowDown className="mr-1 h4 w-4" />
                  {formatTemp(day.temp_min)}
                </span>
                <span className="flex xl:items-center text-red-500">
                  <ArrowDown className="mr-1 h4 w-4" />
                  {formatTemp(day.temp_max)}
                </span>
              </div>

              <div className="sm:flex gap-2 xl:flex-col xl:mt-auto xl:gap-0">
                <span className="flex items-center gap-1">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">{day.humidity}%</span>
                </span>
                <span className="flex items-center gap-1">
                  <Wind className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">{day.wind} m/s</span>
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Forecast;
