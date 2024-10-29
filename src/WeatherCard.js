import React from 'react';
import  './WeatherCard.css';

export default function WeatherCard({text,value}) {
  return (
    <div className="weather-card">
      <h6>{text}</h6>
      <p>{value}</p>
    </div>
  )
}
