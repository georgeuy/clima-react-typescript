import { ChangeEvent, FormEvent, useState } from "react";
import { countries } from "../../data/countries";
import { SearchType } from "../../types";

import style from "./Form.module.css"
import Alert from "../Alert/Alert";

type FormProps = {
  fetchWeather: (state: SearchType) => Promise<void>
}

export default function Form({fetchWeather}:FormProps) {

  const [state, setState] = useState<SearchType>({
    city:'',
    country:''
  })

  const [alert, setAlert] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value 
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // simple validation
    if(Object.values(state).includes('')){
      setAlert('Todos los campos son obligatorios')
      return
    }
    setAlert('')
    await fetchWeather(state)
  }


  return (
    <form 
      className={style.form}
      onSubmit={handleSubmit}
    >

      {alert && <Alert>{alert}</Alert>}

        <div className={style.field}>
            <label htmlFor="city"></label>
            <input 
                type="text" 
                id="city"
                name="city"
                placeholder="Ciudad"
                value={state.city}
                onChange={handleChange}
            />
        </div>
        <div className={style.field}>
            <label htmlFor="country"></label>
            <select 
                name="country" 
                id="country"
                value={state.country}
                onChange={handleChange}
            >
                <option value="">-- Seleccione un Pais --</option>
                {countries.map(country => (
                    <option
                        key={country.code} 
                        value={country.code}
                    >
                        {country.name}
                    </option>
                ))}
            </select>
        </div>
        <input className={style.submit} type="submit" value="Consultar el Clima" />
    </form>
  )
}
