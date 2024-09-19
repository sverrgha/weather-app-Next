"use client";
import React, { useState, useEffect, use } from 'react'
import useWeather from '../hooks/useWeather';
import useWeatherIcon from '../hooks/useWeatherIcon';

interface HomePageCardWeatherDataProps {
  city: string;
}

const HomePageCardWeatherData = (props: HomePageCardWeatherDataProps) => {
  const { weather, error, loading } = useWeather(props.city);
  const weatherIconPath = weather ? 
    useWeatherIcon({ weatherCode: weather.weatherCode, isDay: weather.isDay }) : 
    useWeatherIcon({ weatherCode: -1, isDay: -1 });

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : weather ? (
        <div>
          <div className='flex flex-row justify-around p-2 items-center'>
            <p className='text-black text-3xl'>{`${weather.temperature}°C`}</p>
            <img src={`${weatherIconPath}`} alt='weather icon' className='w-12 h-12'/>
          </div>
          <div className='flex flex-row justify-around p-2 items-center'>
            <p className='text-2xl text-black'>{`${weather.windSpeed}m/s`}</p>
            <img src={'images/icons/arrow.svg'} alt='wind icon' className='w-8 h-8' 
              style={{ transform: `rotate(${weather.windDirection}deg)`}} />
          </div>
          <hr className='bg-black border-0' style={{height: 1 + "px"}}></hr>  


          <p className='font-bold text-black'>{`${weather.isDay ? "Day": "Night"}`}</p>
        </div>
      ) : null}
    </div>
  );
};

export default HomePageCardWeatherData;