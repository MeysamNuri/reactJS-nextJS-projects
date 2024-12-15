import { useState } from "react";

import axios from "axios";
import InstallButton from "./components/InstallButton";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    const URL = "";
    const API_KEY = "";

    if (!navigator.onLine) {
      setError("مثل اینکه آنلاین نیستی دلبندم 🧐");
      return;
    }

    setError(null);

    try {
      const { data } = await axios.get(`${URL}`, {
        params: {
          q: city,
          units: "metric",
          APPID: API_KEY,
          lang: "fa",
        },
      });
      console.log(data);
      setWeather(data);
      setCity("");
    } catch (error) {
      setError("شهری که دنبالشی رو پیدا نکردیم");
      setWeather(null);
      setCity("");
    }
  };

  return (
    <div className="main-container">
      <InstallButton />
      <input
        type="text"
        className="search"
        placeholder="نام شهر..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => (e.key === "Enter" ? fetchWeather() : null)}
      />
      {error && (
        <div className="city">
          <h2 className="city-name">{error}</h2>
        </div>
      )}
      {weather && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>

          <div className="info">
            <img
              className="city-icon"
              src={``}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
