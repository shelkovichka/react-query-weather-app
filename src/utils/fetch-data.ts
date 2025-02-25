import { API_CONFIG } from "@/api/config.ts";
import {
  Coordinates,
  ForecastData,
  GeocodingResponse,
  WeatherData,
} from "@/api/types.ts";

const createURL = (endpoint: string, params: Record<string, string | number>) => {
  const searchParams = new URLSearchParams({
    appid: API_CONFIG.API_KEY,
    ...params,
  });
  return `${endpoint}?${searchParams.toString()}`;
};

const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather API Error: ${response.statusText}`);
  }

  return response.json();
};

export const weatherAPI = {
  getCurrentWeather: async ({ lat, lon }: Coordinates): Promise<WeatherData> => {
    const url = createURL(`${API_CONFIG.BASE_URL}/weather`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_CONFIG.DEFAULT_PARAMS.units,
    });

    return fetchData<WeatherData>(url);
  },

  getForecast: async ({ lat, lon }: Coordinates): Promise<ForecastData> => {
    const url = createURL(`${API_CONFIG.BASE_URL}/forecast`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_CONFIG.DEFAULT_PARAMS.units,
    });

    return fetchData<ForecastData>(url);
  },

  reverseGeocode: async ({ lat, lon }: Coordinates): Promise<GeocodingResponse[]> => {
    const url = createURL(`${API_CONFIG.GEO}/reverse`, {
      lat: lat.toString(),
      lon: lon.toString(),
      limit: 1,
    });

    return fetchData<GeocodingResponse[]>(url);
  },

  searchLocations: async (query: string): Promise<GeocodingResponse[]> => {
    const url = createURL(`${API_CONFIG.GEO}/direct`, {
      q: query,
      limit: 5,
    });

    return fetchData<GeocodingResponse[]>(url);
  },
};
