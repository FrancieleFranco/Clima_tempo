
import React, { useState } from 'react';
import './App.css';
import clima_1 from './assets/img/clima_1.jpg';
import clima_2 from './assets/img/clima_2.jpg';

const api = {
  key: "3ee32176fbc4070662893138e0e9dea6",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [backgroundImage, setBackgroundImage] = useState(null);
  
  const search = async (e) => {
    if (e.key === 'Enter') {
      const response = await fetch(`${api.base}weather?q=${query}&lang=pt_br&units=metric&APPID=${api.key}`);
      const data = await response.json();
      setWeather(data);
      setQuery('');
      
      if (data.main.temp <16) {
        setBackgroundImage(clima_1);
      } else {
        setBackgroundImage(clima_2);
      }
    }
  }
  
  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Pesquise por uma cidade..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        
        {weather.main && (
          <div className="weather-info">
            <h2>Informações Climáticas para {weather.name}, {weather.sys.country}</h2>
            <p>Temperatura: {weather.main.temp}°C</p>
            <p>Condição: {weather.weather[0].description}</p>
            <p>Umidade: {weather.main.humidity}%</p>
            <p>Pressão: {weather.main.pressure} hPa</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;