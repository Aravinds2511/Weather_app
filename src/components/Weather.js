import React, { useState } from "react";
import "./Weather.css";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);

  const API_KEY = "9c76837a834ab01606e07d4dcfead637";
  const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

  const fetchData = async () => {
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

  return (
    <div className="weather-container">
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchData}>Get Weather</button>
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
    </div>
  );
};

export default Weather;
