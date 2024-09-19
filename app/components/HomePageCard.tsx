import HomePageCardWeatherData from './HomePageCardWeatherData';

interface HomePageCardProps {
  city: string
}

interface WeatherData {
  temperature: number;
}

const HomePageCard = (props: HomePageCardProps) => {      
  return (
    <div className='flex-1 border border-neutral-950 p-2 rounded-lg bg-white'>
      <h1 className='text-xl font-bold text-black'>{props.city}</h1>
      <HomePageCardWeatherData city={props.city} />
    
    </div>
  )
}

export default HomePageCard;
