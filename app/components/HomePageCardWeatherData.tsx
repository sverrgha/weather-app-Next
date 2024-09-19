"use client";
import React, { useState, useEffect } from 'react'
import useWeather from '../hooks/useWeather';

interface HomePageCardWeatherDataProps {
  city: string;
}

const HomePageCardWeatherData = (props: HomePageCardWeatherDataProps) => {
  const { weather, error, loading } = useWeather(props.city);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : weather ? (
        <div>
          <p className='font-bold text-black'>{`${weather.temperature}°C`}</p>
          <p className='font-bold text-black'>{`${weather.windSpeed}m/s ${weather.windDirection}°`}</p>
          <p className='font-bold text-black'>{`${weather.isDay ? "Day": "Night"}`}</p>
        </div>
      ) : null}
    </div>
  );
};

export default HomePageCardWeatherData;