import { useState, useRef } from "react"
import axios from "axios"


function App() {
  const [weatherForecast, setWeatherForecast] = useState()
  const inputCity = useRef()

  async function weatherSearch() {
    const city = inputCity.current.value

    const data = await axios.post(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt_br&units=metric&APPID=66df7171bb94888f0408af69c132b4ab`)

    setWeatherForecast(data)

    console.log(data)
  }

  return (
    <div className="App">
      <h1>Weather Forecast API</h1>
      <div>
        <input ref={inputCity} placeholder="Qual cidade você deseja a previsão do tempo?"></input>
        <button onClick={weatherSearch}>Pesquisar</button>
      </div>
      { weatherForecast ? (
        <div>
          <ul>
            <li>{weatherForecast.data.name}, {weatherForecast.data.sys.country}</li>
            <li>Data atual completa</li>
            <li>{weatherForecast.data.main.temp} graus Celsius</li>
            <li>Temperatura Máxima</li>
            <li>Temperatura Mínima</li>
            <li>Condições Atuais:</li>
            <li>Umidade {weatherForecast.data.main.humidity}%</li>
            <li>Pressão Atmosférica {weatherForecast.data.main.pressure} hPa</li>
            <li>Nascer do Sol</li>
            <li>Pôr do Sol</li>
          </ul>
        </div>
      ) : null}
      </div>
      );
}

      export default App;
