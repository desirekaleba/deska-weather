import React, { useState } from 'react';

import { API_KEY, API_URL } from './config';

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  const search = event => {
    if (event.key === "Enter") {
      fetch(`${API_URL}weather?q=${query}&units=metric&APPID=${API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  };

  const dateFormatter = (date) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[date.getDay()];
    let dateD = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    return `${day}, ${dateD} ${month} ${year}`;
  };

  return (
    <div className={
      (typeof weather.main != "undefined" ? 
        ((weather.main.temp > 16) ? 'app warm' : 'app')
      : 'default-app'
      )
    }>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter city name..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{(typeof weather.dt != "undefined" ? dateFormatter(new Date(weather.dt * 1000)) : dateFormatter(new Date()))}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
        <div className="error">{(Number(weather.cod) === 404 ? weather.message : '')}</div>
      </main>
    </div>
  );
}

export default App;
