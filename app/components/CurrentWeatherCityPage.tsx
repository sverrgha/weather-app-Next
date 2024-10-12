"use client";
import React, { useState, useEffect, use } from 'react'
import useWeather from '../hooks/useWeather';
import useWeatherIcon from '../hooks/useWeatherIcon';

const CurrentWeatherCityPage = (props: { city: string }) => {
  const { weather, error, loading } = useWeather(props.city);
  const weatherIconPath = weather ?
    useWeatherIcon({ weatherCode: weather.weatherCode, isDay: weather.isDay }) :
    useWeatherIcon({ weatherCode: -1, isDay: -1 });

  return (
    <div className='w-full'>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : weather ? (
        <div className='flex flex-row-reverse items-center justify-between w-full p-4'>
          <div className='flex flex-row items-center space-x-5'>
            <h1 className='text-blue-500 text-4xl'>{weather.precipitation}mm </h1>
            <img src='images/icons/umbrella.svg' className='w-14 h-14'/>
            </div>
          <div className='border-r border-black h-20'></div>
          <div className='flex flex-row items-center space-x-5'>
            <h1 className='text-black text-4xl'>{weather.windSpeed}m/s</h1>
            <img src='images/icons/arrow.svg' className='w-14 h-14' 
            style={{ transform: `rotate(${weather.windDirection}deg)` }}/>
          </div>
          <div className='border-r border-black h-20'></div>
          <div className='flex flex-row items-center space-x-5'>
            <h1 className='text-black text-4xl'>{weather.temperature + '°C'}</h1>
            <img src={`${weatherIconPath}`} className='w-20 h-20'/>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CurrentWeatherCityPage; 