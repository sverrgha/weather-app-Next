import { fetchWeatherApi } from 'openmeteo';
import { useState, useEffect } from 'react';

interface WeatherData {
  temperature: number;
  isDay: number;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
  humidity: number;
}

const forecastUrl = 'https://api.open-meteo.com/v1/forecast';

const params = {
  latitude: 0,
  longitude: 0,
  "current": ["temperature_2m", "relative_humidity_2m", "is_day", "weather_code", "wind_speed_10m", "wind_direction_10m"],
	"hourly": ["temperature_2m", "weather_code", "cloud_cover", "wind_speed_10m", "uv_index"],
	"wind_speed_unit": "ms",
	"timezone": "Europe/Berlin",
	"models": "best_match"
}

const useWeather = (city: string) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const geoResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
        );
        const geoData = await geoResponse.json();
        if (geoData.results === undefined) {
          throw new Error('No results found');
        }

        params.latitude = geoData.results[0]['latitude'];
        params.longitude = geoData.results[0]['longitude'];

        // const weatherResponse = await fetch(
        //   `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily_weather=true&timezone=Europe%2FOslo&&forecast_days=16`
        // );
        const weatherResponse = await fetchWeatherApi(forecastUrl, params);
        const weatherData = weatherResponse[0];
        const currentWeather = weatherData.current()!;

        setWeather({ 
          temperature: Math.round(currentWeather.variables(0)!.value()!),
          isDay: currentWeather.variables(2)!.value()!,
          weatherCode: currentWeather.variables(3)!.value()!,
          windSpeed: Math.round(currentWeather.variables(4)!.value()!),
          windDirection: Math.round(currentWeather.variables(5)!.value()!),
          humidity: currentWeather.variables(1)!.value()!
         });
        setError(null);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
        console.error(error);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, [city]);
  return { weather, error, loading };
}

export default useWeather;