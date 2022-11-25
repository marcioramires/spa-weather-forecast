import React, { useState, useRef } from "react"
import axios from "axios"

import Button from "../../components/Button"
import ContainerItems from "../../components/ContainerItems"
import Title from "../../components/Title"

import { Wrapped, InputSearch } from "./styles"


function App() {
  const [weatherForecast, setWeatherForecast] = useState()
  const [error, setError] = useState()
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
      .catch(function (error) {
        if (error.response) {
          setError(1)
        } else if (error.request) {
          setError(2)
        }
        setWeatherForecast(null)
      });

    const weatherData = weatherRequest.data
    const img = `https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`

    setWeatherForecast(weatherData)
    setWeatherImg(img)

    setSearchDate(requestDate(weatherData.list[0].dt))
    setSunriseDate(localTime(weatherData.city.sunrise))
    setSunsetDate(localTime(weatherData.city.sunset))
    setError(null)

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
    <Wrapped>
      <ContainerItems searched={weatherForecast}>
      {weatherForecast ? (
          <>
            <img src={weatherImg} alt="icone-do-clima-atual" />
              <p className="mainInfo">{weatherForecast.city.name}, {weatherForecast.city.country}</p>
              <p className="mainInfo">{searchDate}</p>
              <p className="mainInfo">{weatherForecast.list[0].weather[0].description}</p>
              <p className="mainTemp">{weatherForecast.list[0].main.temp.toFixed(0)} ºC</p>
              <p className="complementaryInfo">Máxima {maxTemperature.toFixed(0)}ºC</p>
              <p className="complementaryInfo">Mínima {minTemperature.toFixed(0)}ºC</p>
              <p className="complementaryInfo">Umidade {weatherForecast.list[0].main.humidity}%</p>
              <p className="complementaryInfo">Nuvens no Céu {weatherForecast.list[0].clouds.all}%</p>
              <p className="complementaryInfo">Nascer do Sol: {sunriseDate} | Pôr do Sol: {sunsetDate}</p>
          </>
        ) : null}
        {error === 1 ? (
          <p class="error">Digite uma cidade válida!</p>
        ) : null}
        {error === 2 ? (
          <p class="error">Previsão não disponível, tente mais tarde!</p>
        ) : null}
        <Title>Previsão do Tempo</Title>
          <InputSearch
            ref={inputCity}
            type="text"
            autoFocus
            placeholder="Insira a cidade desejada">
          </InputSearch>
          <Button
            onClick={weatherSearch}>Pesquisar
          </Button>
      </ContainerItems>
    </Wrapped>
  );
}

export default App;