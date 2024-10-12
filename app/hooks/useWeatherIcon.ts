import { useEffect, useState } from 'react';

const getWeatherIcon = (weatherCode: number, isDay: number) => {
  if (weatherCode >= 0 && weatherCode <= 1) return isDay ? 'images/icons/clearDay.svg' : 'images/icons/clearNight.svg';
  if (weatherCode == 2) return isDay ? 'images/icons/partlyOvercastDay.svg' : 'images/icons/partlyOvercastNight.svg';
  if (weatherCode == 3) return 'images/icons/overcast.svg';
  if ((weatherCode >= 51 && weatherCode <= 67) || (weatherCode >= 80 && weatherCode <= 83) ) return 'images/icons/rain.svg';
  if ((weatherCode >= 71 && weatherCode <= 77) || (weatherCode >= 85 && weatherCode <= 86)) return 'images/icons/snow.svg';
  
  return 'images/icons/loading.svg';
}

interface WeatherDataProps {
  weatherCode: number;
  isDay: number;
}

const useWeatherIcon = (props: WeatherDataProps) => {
  const [icon, setIcon] = useState<string>('');

  useEffect(() => {
    setIcon(getWeatherIcon(props.weatherCode, props.isDay));
  }, [props.weatherCode, props.isDay]);
  return icon;
}

export default useWeatherIcon;