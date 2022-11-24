import { useState, useRef } from "react"
import axios from "axios"


function App() {
  const [weatherForecast, setWeatherForecast] = useState()
  const [weatherImg, setWeatherImg] = useState()
  const [maxTemperature, setMaxTemperature] = useState()
  const [minTemperature, setMinTemperature] = useState()
  const [searchDate, setSearchDate] = useState()
  const [sunriseDate, setSunriseDate] = useState()
  const [sunsetDate, setSunsetDate] = useState()
  const inputCity = useRef()

  async function weatherSearch() {
    const city = inputCity.current.value

    const weatherRequest = await axios.post(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=8&lang=pt_br&units=metric&APPID=66df7171bb94888f0408af69c132b4ab`)

    const weatherData = weatherRequest.data
    const img = `http://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`

    setWeatherForecast(weatherData)
    setWeatherImg(img)

    setSearchDate(requestDate(weatherData.list[0].dt))
    setSunriseDate(localTime(weatherData.city.sunrise))
    setSunsetDate(localTime(weatherData.city.sunset))

    const maxTemp = Math.max(
      weatherData.list[0].main.temp_max,
      weatherData.list[1].main.temp_max,
      weatherData.list[2].main.temp_max,
      weatherData.list[3].main.temp_max,
      weatherData.list[4].main.temp_max,
      weatherData.list[5].main.temp_max,
      weatherData.list[6].main.temp_max,
      weatherData.list[7].main.temp_max
    )

    const minTemp = Math.min(
      weatherData.list[0].main.temp_min,
      weatherData.list[1].main.temp_min,
      weatherData.list[2].main.temp_min,
      weatherData.list[3].main.temp_min,
      weatherData.list[4].main.temp_min,
      weatherData.list[5].main.temp_min,
      weatherData.list[6].main.temp_min,
      weatherData.list[7].main.temp_min
    )

    setMaxTemperature(maxTemp)
    setMinTemperature(minTemp)
  }

  function localTime(data) {
    const time = new Date(data * 1000)

    const hour = time.getHours()
    const minute = time.getMinutes()

    return `${hour}h${minute}min`
  }

  function requestDate(data) {
    const time = new Date(data * 1000).toLocaleDateString("pt-br")

    return time
  }

  return (
    <div className="App">
      <h1>Previsão do Tempo</h1>
      <div>
        <input ref={inputCity} placeholder="Insira a cidade desejada"></input>
        <button onClick={weatherSearch}>Pesquisar</button>
      </div>
      {weatherForecast ? (
        <div>
          <img src={weatherImg} alt="icone-do-clima-atual" />
          <ul>
            <li>{weatherForecast.city.name}, {weatherForecast.city.country}</li>
            <li>.</li>
            <li>{searchDate}</li>
            <li>.</li>
            <li>Temperatura Atual: {weatherForecast.list[0].main.temp} ºC</li>
            <li>Sensação Térmica: {weatherForecast.list[0].main.feels_like} ºC</li>
            <li>.</li>
            <li>Condições Atuais: {weatherForecast.list[0].weather[0].description}</li>
            <li>Nuvens no Céu: {weatherForecast.list[0].clouds.all}%</li>
            <li>Umidade {weatherForecast.list[0].main.humidity}%</li>
            <li>Pressão Atmosférica {weatherForecast.list[0].main.pressure} hPa</li>
            <li>.</li>
            <li>Temperatura Máxima para as próximas 24 horas: {maxTemperature}ºC</li>
            <li>Temperatura Mínima para as próximas 24 horas: {minTemperature}ºC</li>
            <li>.</li>
            <li>Nascer do Sol: {sunriseDate}</li>
            <li>Pôr do Sol: {sunsetDate}</li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default App;
