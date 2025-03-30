import {FC} from 'react';
import {
  ArrowDown,
  ArrowUp,
  Droplets,
  Wind,
  Sunrise,
  Sunset,
} from 'lucide-react';
import {format} from 'date-fns';

import {GeocodingResponse, type WeatherData} from '@/api/types';
import {Card, CardContent} from '@/components/ui/card';
import WeatherAnimation from '@/components/weather-animation';

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodingResponse;
}

const CurrentWeather: FC<CurrentWeatherProps> = ({
  data,
  locationName,
}) => {
  const {
    weather: [currentWeather],
    main: {
      temp,
      feels_like: feelsLike,
      temp_max: tempMax,
      temp_min: tempMin,
      humidity,
    },
    wind: {speed},
    sys: {sunrise, sunset},
  } = data;

  const formatTemp = (temp: number) => `${Math.round(temp)}°`;
  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), 'h:mm a');
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-6">
              <div className="flex items-end">
                <h2 className="text-2xl font-bold tracking-tighter">
                  {locationName?.name}{' '}
                  <span className="text-sm text-muted-foreground">
                    {locationName?.country}
                  </span>
                </h2>
              </div>

              <div className="flex items-center gap-4">
                <p className="text-7xl font-bold tracking-tighter">
                  {formatTemp(temp)}
                </p>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Feels like {formatTemp(feelsLike)}
                  </p>
                  <div className="flex gap-2 text-sm font-medium">
                    <span className="flex items-center gap-1 text-blue-500">
                      <ArrowDown className="h-3 w-3" />
                      {formatTemp(tempMin)}
                    </span>
                    <span className="flex items-center gap-1 text-red-500">
                      <ArrowUp className="h-3 w-3" />
                      {formatTemp(tempMax)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Humidity</p>
                    <p className="text-sm text-muted-foreground">{humidity}%</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-blue-500" />
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Wind Speed</p>
                    <p className="text-sm text-muted-foreground">{speed} m/s</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Sunrise className="h-4 w-4 text-orange-500" />
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Sunrise</p>
                    <p className="text-sm text-muted-foreground">
                      {formatTime(sunrise)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Sunset className="h-4 w-4 text-blue-500" />
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Sunset</p>
                    <p className="text-sm text-muted-foreground">
                      {formatTime(sunset)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div
              className="relative flex aspect-square w-full
                max-w-[200px] items-center justify-center"
            >
              <WeatherAnimation
                iconCode={currentWeather.icon}
                className="h-[80%] w-[80%]"
              />
              <div className="absolute bottom-0 text-center">
                <p className="text-sm font-medium capitalize">
                  {currentWeather.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
