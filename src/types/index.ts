export type SearchType = {
    city: string
    country: string
}

export type Country = {
  code: string
  name: string
}

// FOR TYPE GUARD OR ASSERTIONS
// export type Weather = {
//   name: string,
//   main: {
//     feels_like: number,
//     humidity: number,
//     temp: number,
//     temp_max: number,
//     temp_min: number
//   }
// }

