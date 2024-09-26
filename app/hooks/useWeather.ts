import { fetchWeatherApi } from 'openmeteo';
import { useState, useEffect } from 'react';

interface WeatherData {
  temperature: number;
  isDay: number;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
  humidity: number;
  hourly: HourlyData;
  daily: DailyData;
}

interface HourlyData {
  weatherCode: number[],
  temerature_2m: number[],
  wind_speed_10m: number[],
  wind_direction: number[],
  wind_gusts_10m: number[]
}

interface DailyData {
  weatherCode: number[];
  temperature2mMax: number[];
  temperature2mMin: number[];
  windSpeed10mMax: number[];
  windDirection10mDominant: number[];
}

const forecastUrl = 'https://api.open-meteo.com/v1/forecast';

const params = {
  latitude: 0,
  longitude: 0,
  "current": ["temperature_2m", "relative_humidity_2m", "is_day", "weather_code", "wind_speed_10m", "wind_direction_10m"],
  "hourly": ["weather_code", "temperature_2m", "wind_speed_10m", "wind_direction_10m", "wind_gusts_10m"],
  "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "sunrise", "sunset",
    "precipitation_hours", "wind_speed_10m_max", "wind_direction_10m_dominant"],
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
        const hourlyWeather = weatherData.hourly()!;
        const dailyWeather = weatherData.daily()!;

        setWeather({
          temperature: Math.round(currentWeather.variables(0)!.value()!),
          isDay: currentWeather.variables(2)!.value()!,
          weatherCode: currentWeather.variables(3)!.value()!,
          windSpeed: Math.round(currentWeather.variables(4)!.value()!),
          windDirection: Math.round(currentWeather.variables(5)!.value()!),
          humidity: currentWeather.variables(1)!.value()!,
          hourly: {
            weatherCode: Array.from(hourlyWeather.variables(0)!.valuesArray()!),
            temerature_2m: Array.from(hourlyWeather.variables(1)!.valuesArray()!),
            wind_speed_10m: Array.from(hourlyWeather.variables(2)!.valuesArray()!),
            wind_direction: Array.from(hourlyWeather.variables(3)!.valuesArray()!),
            wind_gusts_10m: Array.from(hourlyWeather.variables(4)!.valuesArray()!)
          },
          daily: {
            weatherCode: Array.from(dailyWeather.variables(0)!.valuesArray()!),
            temperature2mMax: Array.from(dailyWeather.variables(1)!.valuesArray()!).map(Math.round),
            temperature2mMin: Array.from(dailyWeather.variables(2)!.valuesArray()!).map(Math.round),
            windSpeed10mMax: Array.from(dailyWeather.variables(6)!.valuesArray()!).map(Math.round),
            windDirection10mDominant: Array.from(dailyWeather.variables(7)!.valuesArray()!),
          }
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