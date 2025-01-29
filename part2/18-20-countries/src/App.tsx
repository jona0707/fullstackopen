import { useEffect, useState } from "react";
import { Filter } from "./components/Filter";
import countriesServices from "./services/countriesServices";
import { CountryTypes } from "./types/countryTypes";
import { CountryItem } from "./components/CountryItem";
import { ParticularCountry } from "./components/ParticularCountry";

const App = () => {
  const [filterValue, setFilterValue] = useState(null as string | null);
  const [notifications, setNotifications] = useState(null as string | null);
  const [countries, setCountries] = useState([]);
  const [particularCountry, setParticularCountry] = useState(
    null as CountryTypes | null
  );

  useEffect(() => {
    if (filterValue !== null) {
      countriesServices.getAll().then((countries) => {
        const filterCountries = countries.filter((country: CountryTypes) =>
          country.name.common.toLowerCase().includes(filterValue.toLowerCase())
        );
        if (filterCountries.length > 10) {
          setNotifications("Too many matches, specify another filter");
          setCountries([]);
          setParticularCountry(null);
          return;
        } else if (filterCountries.length === 1) {
          setNotifications(null);
          setParticularCountry(filterCountries[0]);
          setCountries([]);
        } else {
          setNotifications(null);
          setCountries(filterCountries);
          setParticularCountry(null);
        }
      });
    }
  }, [filterValue]);

  const handleSelectParticularCountry = (country: CountryTypes) => {
    setParticularCountry(country);
  };

  return (
    <div>
      <div>
        find countries
        <Filter setFilterValue={setFilterValue} />
        {notifications !== null ? <p>{notifications}</p> : null}
        {countries.map((country: CountryTypes) => (
          <CountryItem
            key={country.name.common}
            country={country}
            handleSelectParticularCountry={handleSelectParticularCountry}
          />
        ))}
        {particularCountry !== null && (
          <ParticularCountry particularCountry={particularCountry} />
        )}
      </div>
    </div>
  );
};

export default App;
