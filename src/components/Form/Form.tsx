import { countries } from "../../data/countries";

export default function Form() {
  return (
    <form>

        <div>
            <label htmlFor="city"></label>
            <input 
                type="text" 
                id="city"
                name="city"
                placeholder="Ciudad"
            />
        </div>
        <div>
            <label htmlFor="country"></label>
            <select 
                name="country" 
                id="country"
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
        <input type="submit" value="Consultar el Clima" />
    </form>
  )
}
