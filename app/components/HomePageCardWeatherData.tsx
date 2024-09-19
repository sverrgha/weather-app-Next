"use client";
import React, { useState, useEffect } from 'react'
import useWeather from '../hooks/useWeather';
import useWeatherIcon from '../hooks/useWeatherIcon';

interface HomePageCardWeatherDataProps {
  city: string;
}

const HomePageCardWeatherData = (props: HomePageCardWeatherDataProps) => {
  const { weather, error, loading } = useWeather(props.city);
  const weatherIconPath = useWeatherIcon(2);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : weather ? (
        <div>
          <div className='flex flex-row justify-between p-2 items-center'>
            <p className='font-bold text-black text-3xl'>{`${weather.temperature}°C`}</p>
            <img src={`images/icons/clearDay.svg`} alt='weather icon' className='w-12 h-12'/>
          </div>
          <p className='font-bold text-black'>{`${weather.windSpeed}m/s ${weather.windDirection}°`}</p>
          <p className='font-bold text-black'>{`${weather.isDay ? "Day": "Night"}`}</p>
        </div>
      ) : null}
    </div>
  );
};

export default HomePageCardWeatherData;