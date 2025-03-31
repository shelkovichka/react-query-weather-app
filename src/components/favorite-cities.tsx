import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useFavorites } from "@/hooks/use-favorites";
import { useWeatherQuery } from "@/hooks/use-weather";

import { Button } from "./ui/button";
import WeatherAnimation from "./weather-animation";

interface FavoriteCityProps {
  id: string;
  name: string;
  lat: number;
  lon: number;
  onRemove: (id: string) => void;
}

const FavoriteCity: FC<FavoriteCityProps> = ({
  id,
  name,
  lat,
  lon,
  onRemove,
}) => {
  const { data: weather, isLoading } = useWeatherQuery({ lat, lon });
  const navigate = useNavigate();

  const renderLoading = () => {
    return (
      <div className="flex h-8 w-8 items-center justify-center">
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
    );
  };

  return (
    <div
      className="relative flex items-center min-w-[250px] cursor-pointer
        gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm
        transition-all hover:shadow-md"
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/city/${name}?lat=${lat}&lon=${lon}`)}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-1 top-1 h-6 w-6 rounded-full p-0
          hover:text-destructive-foreground group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
          toast.error(`${name} removed from favorites`);
        }}
      >
        <X className="w-4 h-4" />
      </Button>

      {isLoading
        ? renderLoading()
        : weather && (
            <>
              <div className="flex items-center gap-3">
                <WeatherAnimation
                  iconCode={weather.weather[0].icon}
                  className="h-8 w-8"
                />
                <div>
                  <p className="font-medium">{name}</p>
                  <p className="text-sm text-muted-foreground">
                    {weather.sys.country}
                  </p>
                </div>
              </div>
              <div className="ml-auto text-right">
                <p className="text-xl font-bold">
                  {Math.round(weather.main.temp)}°
                </p>
                <p className="text-xs capitalize text-muted-foreground">
                  {weather.weather[0].description}
                </p>
              </div>
            </>
          )}
    </div>
  );
};

const FavoriteCities: FC = () => {
  const { favorites, removeFavorite } = useFavorites();

  if (!favorites) {
    return null;
  }

  return (
    <>
      <h1 className="text-xl font-bold tracking-tight">Favorites</h1>
      <div className="pb-2 overflow-x-auto w-full ">
        <div className="flex gap-4">
          {favorites.map((favorite) => (
            <FavoriteCity
              key={favorite.id}
              onRemove={() => removeFavorite.mutate(favorite.id)}
              {...favorite}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FavoriteCities;
