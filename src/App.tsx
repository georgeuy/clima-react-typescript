import useWeather from "./hooks/useWeather"
import Form from "./components/Form/Form"

import style from "./App.module.css"
import WeatherDetails from "./components/WeatherDetails/WeatherDetails"
import Spinner from "./components/Spinner/Spinner"
import Alert from "./components/Alert/Alert"

function App() {

  const { fetchWeather, weather, hasWeatherData, loading, notFound } = useWeather()

  return (
    <>
      <h1 className={style.title}>Buscador de climas</h1>
      <div className={style.container}>
        <Form 
          fetchWeather={fetchWeather}
        />
        {loading && <Spinner />}
        {hasWeatherData && <WeatherDetails weather={weather} />}
        {notFound && <Alert>Ciudad no encontrada</Alert>}
      </div>
    </>
  )
}

export default App
