import {FC} from 'react';
import {format} from 'date-fns';
import {ArrowDown, ArrowUp, Droplets, Wind} from 'lucide-react';

import {ForecastData} from '@/api/types';
import {useForecastData} from '@/hooks/use-forecast';
import {Card, CardContent} from '@/components/ui/card.tsx';
import WeatherAnimation from '@/components/weather-animation';

interface ForecastProps {
  data: ForecastData;
}

const Forecast: FC<ForecastProps> = ({data}) => {
  const { nextDays } = useForecastData(data);

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
                <span className="flex items-center text-blue-500">
                  <ArrowDown className="mr-1 size-4" />
                  {formatTemp(day.temp_min)}
                </span>
                <span className="flex items-center text-red-500">
                  <ArrowUp className="mr-1 size-4" />
                  {formatTemp(day.temp_max)}
                </span>
              </div>

              <div className="sm:flex gap-2 xl:flex-col xl:mt-auto xl:gap-0">
                <span className="flex items-center gap-1">
                  <Droplets className="size-4 text-blue-500" />
                  <span className="text-sm">{day.humidity}%</span>
                </span>
                <span className="flex items-center gap-1">
                  <Wind className="size-4 text-blue-500" />
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
