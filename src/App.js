import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '19ba025847df155e1f00e43109330d02'; // Substitua pela sua chave API

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: city,
          appid: apiKey,
          units: 'metric',
          lang: 'pt'
        }
      });
      setWeather(response.data);
      setError('');
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Cidade não encontrada.');
      } else if (err.response && err.response.status === 401) {
        setError('Erro de autenticação. Verifique sua chave de API.');
      } else {
        setError('Erro ao buscar os dados. Tente novamente mais tarde.');
      }
      setWeather(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="weather-app">
      <h1>Aplicativo de Clima</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Digite o nome da cidade"
        />
        <button type="submit">Buscar Clima</button>
      </form>
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperatura: {weather.main.temp} °C</p>
          <p>Condições: {weather.weather[0].description}</p>
          <p>Umidade: {weather.main.humidity} %</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;



