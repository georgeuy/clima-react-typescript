export const formarTemperature = (temp:number): number => {
    const kelvin = 273.15
    return parseInt((temp - kelvin).toString())
}