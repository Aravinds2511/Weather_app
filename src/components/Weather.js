import React, { useState } from "react";
import "./Weather.css";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);

  const API_KEY = "9c76837a834ab01606e07d4dcfead637";
  const API_URL = `https://api.openweathermap.org/data/2.5/weather`;
  const FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast`;

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        setError(null);
      } else {
        setError(data.message);
        setWeatherData(null);
      }
    } catch (error) {
      console.error("Error fetching weather data: ", error);
      setError("Error fetching weather data. Please try again later.");
      setWeatherData(null);
    }
  };

  const fetchForecastData = async () => {
    try {
      const response = await fetch(
        `${FORECAST_API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (response.ok) {
        setForecastData(data);
      } else {
        setError(data.message);
        setForecastData(null);
      }
    } catch (error) {
      console.error("Error fetching forecast data: ", error);
      setError("Error fetching forecast data. Please try again later.");
      setForecastData(null);
    }
  };

  return (
    <div className="weather-container">
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeatherData}>Get Weather</button>
      <button onClick={fetchForecastData}>Get Forecast</button>
      {error && <p className="error-message">{error}</p>}
      {weatherData && weatherData.main && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            alt="weather icon"
          />
        </div>
      )}
      {forecastData && forecastData.list && (
        <div className="forecast-info">
          <h2>Weather Forecast</h2>
          {forecastData.list.map((forecast) => (
            <div key={forecast.dt} className="forecast-item">
              <p>{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
              <p>{new Date(forecast.dt * 1000).toLocaleTimeString()}</p>
              <p>Temperature: {forecast.main.temp}°C</p>
              <p>Weather: {forecast.weather[0].description}</p>
              <img
                src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
                alt="weather icon"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Weather;
