import { useEffect, useState } from "react";
import weatherServices from "../services/weatherServices";

export const CityWeather = ({ capital }: { capital: string }) => {
  // Es string porque hago el fixed a 2 decimales y lo convierte.
  const [temperature, setTemperature] = useState(null as string | null);
  const [wind, setWind] = useState(null as number | null);
  const [icon, setIcon] = useState(
    null as {
      description: string;
      icon: string;
      main: string;
      id: number;
    } | null
  );
  const imgUrl = `http://openweathermap.org/img/wn/${icon?.icon}@2x.png`;
  useEffect(() => {
    weatherServices.getCityWeather(capital).then(({ main, wind, weather }) => {
      const tempC = (main.temp - 273.15).toFixed(2);
      setTemperature(tempC);
      setWind(wind.speed);
      setIcon(weather[0]);
    });
  }, []);

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>temperature {temperature}</p>
      <img src={imgUrl} alt={icon?.description} />
      <p>wind {wind?.toString()} m/s</p>
    </div>
  );
};
