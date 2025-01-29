import axios from "axios";
const baseUrl = (city: string, api: string) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;

const getCityWeather = async (city: string) => {
  const request = await axios.get(
    baseUrl(city, import.meta.env.VITE_OPENWEATHER_API_KEY)
  );
  return request.data;
};

export default { getCityWeather };
