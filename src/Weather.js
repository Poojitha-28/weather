import React, { useState } from 'react';
import WeatherCard from './WeatherCard'; // Ensure this path is correct
import './WeatherCard.css'; 

export default function Weather() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State for error handling

  async function fetchWeather(location) {
    const apiKey = 'f6fa2ee750ae409b952162400242610'; // Make sure this key is valid
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    try {
      setLoading(true);
      setError(null); // Reset any previous errors
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const weatherData = await response.json();
      setData(weatherData); // Store weather data
    } catch (error) {
      alert('Failed to fetch weather data');
      console.error('Error fetching weather data:', error);
      setError(error.message); // Set error message
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = () => {
    if (location) {
      fetchWeather(location);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter city name"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

      {data && (
        <div className="weather-cards">
          <WeatherCard text="Temperature" value={`${data.current.temp_c} °C`} />
          <WeatherCard text="Humidity" value={`${data.current.humidity} %`} />
          <WeatherCard text="Condition" value={data.current.condition.text} />
          <WeatherCard text="Wind Speed" value={`${data.current.wind_kph} kph`} />
        </div>
      )}
    </div>
  );
}
