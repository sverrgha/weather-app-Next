'use client';
import React, { useState, useEffect } from 'react'
import useWeather from '../hooks/useWeather';

interface HomePageCardProps {
  city: string
}

interface WeatherData {
  temperature: number;
}

const HomePageCard = (props: HomePageCardProps) => {
  const { weather, error, loading } = useWeather(props.city);
  console.log(weather?.temperature, weather?.isDay, weather?.weatherCode, weather?.windSpeed, weather?.windDirection, weather?.humidity);
      
  return (
    <div className='flex-1 border border-neutral-950 p-2 rounded-lg bg-white'>
      <h1 className='text-xl font-bold text-black'>{props.city}</h1>
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
  )
}

export default HomePageCard;
