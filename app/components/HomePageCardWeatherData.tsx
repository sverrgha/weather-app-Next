"use client";
import React, { useState, useEffect, use } from 'react'
import useWeather from '../hooks/useWeather';
import useWeatherIcon from '../hooks/useWeatherIcon';

interface HomePageCardWeatherDataProps {
  city: string;
}

const nextWeekdays = (numOfDays: number) => {
  return Array.from({ length: numOfDays }, (_, i) => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + i + 1);
    return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(futureDate);
  });
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
            <img src={`${weatherIconPath}`} alt='weather icon' className='w-12 h-12' />
          </div>
          <div className='flex flex-row justify-around p-2 items-center'>
            <p className='text-2xl text-black'>{`${weather.windSpeed}m/s`}</p>
            <img src={'images/icons/arrow.svg'} alt='wind icon' className='w-8 h-8'
              style={{ transform: `rotate(${weather.windDirection}deg)` }} />
          </div>
          <hr className='bg-black border-0' style={{ height: 1 + "px" }}></hr>
          {nextWeekdays(3).map((day, index) => (
            <>
              <hr className='bg-black border-0' style={{ height: 1 + "px" }}></hr>
              <div className='flex flex-row justify-between text-black text-xl'>
                <h1>{day}: </h1>
                <h1>{weather.daily.temperature2mMax[index + 1]}/{weather.daily.temperature2mMin[index + 1]}°C</h1>
              </div>
            </>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default HomePageCardWeatherData;