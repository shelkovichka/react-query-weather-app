import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import LoadingSkeleton from "@/components/loading-skeleton";
import CurrentWeather from "@/components/current-weather";
import TempInHours from "@/components/temp-in-hours";
import Forecast from "@/components/forecast";
import FavoriteButton from "@/components/favorite-button";

const City: React.FC = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") ?? "0");
  const lon = parseFloat(searchParams.get("lon") ?? "0");

  const coordinates = { lat, lon };
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please try again.</p>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">
          {params.cityName}, {weatherQuery.data.sys.country}
        </h1>
        <div>
          <FavoriteButton
            data={{ ...weatherQuery.data, name: params.cityName }}
          />
        </div>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather data={weatherQuery.data} />
          <TempInHours data={forecastQuery.data} />
        </div>
        <Forecast data={forecastQuery.data} />
      </div>
    </div>
  );
};

export default City;
