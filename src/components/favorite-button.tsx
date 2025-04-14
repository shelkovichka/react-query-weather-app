import { FC, useCallback } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";

import { WeatherData } from "@/api/types";
import { useFavorites } from "@/hooks/use-favorites";

import { Button } from "./ui/button";

interface FavoriteButtonProps {
  data: WeatherData;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({ data }) => {
  const { addFavorite, isFavorite, removeFavorite } = useFavorites();

  const handleToggleFavorite = useCallback(() => {
    const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

    if (isCurrentlyFavorite) {
      removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`${data.name} removed from favorites`);
    } else {
      addFavorite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`${data.name} added to favorites`);
    }
  }, [data, isFavorite, removeFavorite, addFavorite]);

  const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

  return (
    <Button
      variant={isCurrentlyFavorite ? "default" : "outline"}
      size="icon"
      className={isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""}
      onClick={handleToggleFavorite}
    >
      <Star
        className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""}`}
      />
    </Button>
  );
};

export default FavoriteButton;
