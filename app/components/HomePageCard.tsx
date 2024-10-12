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
      <Link className='text-3xl text-black font-serif' href={`/${props.city}`}>{props.city}</Link>
      <hr className='bg-black border-0' style={{height: 1 + "px"}}></hr>
      <HomePageCardWeatherData city={props.city} />
    
    </div>
  )
}

export default HomePageCard;
