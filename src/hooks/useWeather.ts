import axios from "axios";
import { z } from "zod";
// import { object, string, number, InferOutput, parseAsync } from 'valibot'

import type { SearchType } from "../types";
import { useMemo, useState } from "react";

// TYPE GUARD OR ASSERTIONS
// const isWeatherResponse = (weather: unknown): weather is Weather => {
//     return Boolean(weather) &&
//         typeof (weather as Weather).name === 'string' &&
//         typeof (weather as Weather).main === 'object' &&
//         typeof (weather as Weather).main.feels_like === 'number' &&
//         typeof (weather as Weather).main.humidity === 'number' &&
//         typeof (weather as Weather).main.temp === 'number' &&
//         typeof (weather as Weather).main.temp_max === 'number' &&
//         typeof (weather as Weather).main.temp_min === 'number'
// }


// FOR ZOD
const WeatherSchema = z.object({
    name: z.string(),
    main: z.object({
        feels_like: z.number(),
        humidity: z.number(),
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number(),
    })
  })
export type Weather = z.infer<typeof WeatherSchema>


// valibot
// const WeatherSchema = object({
//     name: string(),
//     main: object({
//         feels_like: number(),
//         humidity: number(),
//         temp: number(),
//         temp_max: number(),
//         temp_min: number(),
//     })
//   })
// type Weather = InferOutput<typeof WeatherSchema>

const initialState: Weather = {
    name: '',
    main: {
        feels_like: 0,
        humidity: 0,
        temp: 0,
        temp_max: 0,
        temp_min: 0
    }
}

export default function useWeather() {

    const [ weather, setWeather] = useState<Weather>(initialState)
    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)

    const fetchWeather = async (state:SearchType) => {
        setLoading(true)
        setWeather(initialState)
        setNotFound(false)
        try {

            const appiId = import.meta.env.VITE_API_KEY
            const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${state.city},${state.country}&appid=${appiId}`
            const response = await axios.get<any>(geoURL)

            //obtener lat y long
            const {data} = response 

            if(!data[0]){
                setNotFound(true)
                return
            }

            const lat = data[0].lat
            const lon = data[0].lon

            // obtener el clima
            const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appiId}`
            
            const {data:weatherResult} = await axios.get<Weather>(weatherURL)            
            
            // FOR TYPE GUARD OR ASSERTIONS
            // if(isWeatherResponse(weatherResult)){
            //     console.log(weatherResult.name);
            // }else{
            //     console.log('Respuesta mal formada');
            // }

            //FOR ZOD
            const result = WeatherSchema.safeParse(weatherResult)
            if(result.success){
                setWeather(result.data);
            }else{
                console.log('Respuesta mal formada');
            }

            //valibot
            // const result = await parseAsync(WeatherSchema, weatherResult)
            // if(result){
            //     console.log(result.name);
            //     console.log(result.main.temp);
            // }else{
            //     console.log('Respuesta mal formada');   
            // }
            
            
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false)
        }
        
    }

    const hasWeatherData = useMemo(() => weather.name ,[weather])


    return {
        fetchWeather,
        weather,
        hasWeatherData,
        loading,
        notFound
    }


}