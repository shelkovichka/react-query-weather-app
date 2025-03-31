import { FC } from "react";
import {
  ArrowDown,
  ArrowUp,
  Droplets,
  Wind,
  Sunrise,
  Sunset,
} from "lucide-react";
import { format } from "date-fns";

import { GeocodingResponse, type WeatherData } from "@/api/types";
import { Card, CardContent } from "@/components/ui/card";
import WeatherAnimation from "@/components/weather-animation";

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodingResponse;
}

interface MetricItemProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  iconClassName?: string;
}

const MetricItem: FC<MetricItemProps> = ({
  icon,
  title,
  value,
  iconClassName,
}) => (
  <div className="flex items-center gap-2">
    <div className={iconClassName}>{icon}</div>
    <div className="space-y-0.5">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-sm text-muted-foreground">{value}</p>
    </div>
  </div>
);

const CurrentWeather: FC<CurrentWeatherProps> = ({ data, locationName }) => {
  const {
    weather: [currentWeather],
    main: {
      temp,
      feels_like: feelsLike,
      temp_max: tempMax,
      temp_min: tempMin,
      humidity,
    },
    wind: { speed },
    sys: { sunrise, sunset },
  } = data;

  const formatTemp = (temp: number) => `${Math.round(temp)}°`;
  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "h:mm a");
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-6">
              {locationName && (
                <div className="flex items-end">
                  <h2 className="text-2xl font-bold tracking-tighter">
                    {locationName.name}{" "}
                    <span className="text-sm text-muted-foreground">
                      {locationName.country}
                    </span>
                  </h2>
                </div>
              )}

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
                <MetricItem
                  icon={<Droplets className="h-4 w-4" />}
                  title="Humidity"
                  value={`${humidity}%`}
                  iconClassName="text-blue-500"
                />

                <MetricItem
                  icon={<Wind className="h-4 w-4" />}
                  title="Wind Speed"
                  value={`${speed} m/s`}
                  iconClassName="text-blue-500"
                />

                <MetricItem
                  icon={<Sunrise className="h-4 w-4" />}
                  title="Sunrise"
                  value={formatTime(sunrise)}
                  iconClassName="text-orange-500"
                />

                <MetricItem
                  icon={<Sunset className="h-4 w-4" />}
                  title="Sunset"
                  value={formatTime(sunset)}
                  iconClassName="text-blue-500"
                />
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
