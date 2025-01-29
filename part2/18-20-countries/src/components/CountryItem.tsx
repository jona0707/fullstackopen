import { CountryTypes } from "../types/countryTypes";

export const CountryItem = ({
  country,
  handleSelectParticularCountry,
}: {
  country: CountryTypes;
  handleSelectParticularCountry: (country: CountryTypes) => void;
}) => {
  return (
    <>
      <div key={country.name.common}>
        {country.name.common}
        <button onClick={() => handleSelectParticularCountry(country)}>show</button>
      </div>
    </>
  );
};
