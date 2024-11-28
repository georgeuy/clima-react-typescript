import { formarTemperature } from '../../helpers'
import { Weather } from '../../hooks/useWeather'
import style from './WeatherDetails.module.css'

type WeatherDetailsProps = {
    weather: Weather
}

export default function WeatherDetails({weather}:WeatherDetailsProps) {
  return (
    <div className={style.container}>
       <h2>Clima de: {weather.name}</h2>
       <p className={style.current}>{formarTemperature(weather.main.temp)}&deg;C</p>
       <div className={style.temperatures}>
        <p>Min: <span>{formarTemperature(weather.main.temp_min)}&deg;C</span></p>
        <p>max: <span>{formarTemperature(weather.main.temp_max)}&deg;C</span></p>
       </div>
    </div>
  )
}
