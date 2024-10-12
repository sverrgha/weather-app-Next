import { fetchWeatherApi } from 'openmeteo';
import { useState, useEffect } from 'react';

interface WeatherData {
  temperature: number;
  isDay: number;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
  humidity: number;
  precipitation: number;
  hourly: HourlyData;
  daily: DailyData;
  time: Date;
}

interface HourlyData {
  weatherCode: number[],
  temerature_2m: number[],
  wind_speed_10m: number[],
  wind_direction: number[],
  wind_gusts_10m: number[],
  precipitation: number[],
  precipitation_probability: number[],
  time: Date[],
}

interface DailyData {
  weatherCode: number[];
  temperature2mMax: number[];
  temperature2mMin: number[];
  windSpeed10mMax: number[];
  windDirection10mDominant: number[];
  precipitation_sum: number[];
  precipitation_probability_max: number[];
  time: Date[];
}
const forecastUrl = 'https://api.open-meteo.com/v1/forecast';

const params = {
  latitude: 0,
  longitude: 0,
  timezone: "auto",
  "current": ["temperature_2m", "relative_humidity_2m", "is_day", "weather_code", "wind_speed_10m", "wind_direction_10m",
    "precipitation"],
  "hourly": ["weather_code", "temperature_2m", "wind_speed_10m", "wind_direction_10m", "wind_gusts_10m", "precipitation",
    "precipitation_probability"],
  "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "sunrise", "sunset",
    "precipitation_sum", "precipitation_probability_max", "wind_speed_10m_max", "wind_direction_10m_dominant"],
};

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

        const weatherResponse = await fetchWeatherApi(forecastUrl, params);
        const weatherData = weatherResponse[0];
        const currentWeather = weatherData.current()!;
        const hourlyWeather = weatherData.hourly()!;
        const dailyWeather = weatherData.daily()!;

        const utcOffsetSeconds = weatherData.utcOffsetSeconds();

        setWeather({
          temperature: Math.round(currentWeather.variables(0)!.value()!),
          isDay: currentWeather.variables(2)!.value()!,
          weatherCode: currentWeather.variables(3)!.value()!,
          windSpeed: Math.round(currentWeather.variables(4)!.value()!),
          windDirection: Math.round(currentWeather.variables(5)!.value()!),
          humidity: currentWeather.variables(1)!.value()!,
          precipitation: currentWeather.variables(6)!.value()!,
          time: new Date((Number(currentWeather.time()) + utcOffsetSeconds) * 1000),
          hourly: {
            weatherCode: Array.from(hourlyWeather.variables(0)!.valuesArray()!),
            temerature_2m: Array.from(hourlyWeather.variables(1)!.valuesArray()!),
            wind_speed_10m: Array.from(hourlyWeather.variables(2)!.valuesArray()!),
            wind_direction: Array.from(hourlyWeather.variables(3)!.valuesArray()!),
            wind_gusts_10m: Array.from(hourlyWeather.variables(4)!.valuesArray()!),
            precipitation: Array.from(hourlyWeather.variables(5)!.valuesArray()!),
            precipitation_probability: Array.from(hourlyWeather.variables(6)!.valuesArray()!),
            time: Array.from(
              { length: (Number(hourlyWeather.timeEnd() - hourlyWeather.time())) / hourlyWeather.interval() + 1 },
              (_, index) => new Date((Number(hourlyWeather.time()) + index * hourlyWeather.interval() + utcOffsetSeconds) * 1000)
            )
          },
          daily: {
            weatherCode: Array.from(dailyWeather.variables(0)!.valuesArray()!),
            temperature2mMax: Array.from(dailyWeather.variables(1)!.valuesArray()!).map(Math.round),
            temperature2mMin: Array.from(dailyWeather.variables(2)!.valuesArray()!).map(Math.round),
            precipitation_sum: Array.from(dailyWeather.variables(5)!.valuesArray()!),
            precipitation_probability_max: Array.from(dailyWeather.variables(6)!.valuesArray()!),
            windSpeed10mMax: Array.from(dailyWeather.variables(7)!.valuesArray()!).map(Math.round),
            windDirection10mDominant: Array.from(dailyWeather.variables(7)!.valuesArray()!),
            time: Array.from(
              { length: (Number(dailyWeather.timeEnd() - dailyWeather.time())) / dailyWeather.interval() + 1 },
              (_, index) => new Date((Number(dailyWeather.time()) + index * dailyWeather.interval() + utcOffsetSeconds) * 1000)
            )
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
  console.log(weather?.hourly.weatherCode.length);
  return { weather, error, loading };
}

export default useWeather;