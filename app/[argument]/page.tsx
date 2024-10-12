import React from 'react';
import CurrentWeatherCityPage from '../components/CurrentWeatherCityPage';

type Props = {
  params: { argument: string }
}

export default function CityPage({ params }: Props) {
  const decodedCity = decodeURIComponent(params.argument);

  return (
    <div className='flex w-screen items-center justify-center padd'>
      <div className='flex flex-row bg-white border border-black rounded-[20px] p-5 w-[80%] justify-between items-center'>
        <div className='flex flex-row items-center space-x-5'>
          <h1 className='text-black text-6xl font-serif border-b-2 border-black'>{decodedCity}</h1>
          <div className='w-0 border-r-2 border-black h-20'></div>
        </div>
        <CurrentWeatherCityPage city={decodedCity} />
      </div>
    </div>
  )
}