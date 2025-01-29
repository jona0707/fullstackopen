import { CountryTypes } from "../types/countryTypes";
import { CityWeather } from "./CityWeather";

export const ParticularCountry = ({
  particularCountry,
}: {
  particularCountry: CountryTypes;
}) => {
  return (
    <div>
      <h1>{particularCountry.name.common}</h1>
      <p>capital {particularCountry.capital[0]}</p>
      <p>area {particularCountry.area}</p>
      <strong>languages:</strong>
      <ul>
        {Object.values(particularCountry.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={particularCountry.flags.png}
        alt={particularCountry.flags.alt}
        width="100"
      />

      <CityWeather capital={particularCountry.capital[0]} />
    </div>
  );
};
