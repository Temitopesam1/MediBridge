import React, { useState, useEffect } from 'react';
import { CountrySelector, CitySelector } from './LocationSearch';
import axios from 'axios';

const Search = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleSelectCountry = (countryCode) => {
    setSelectedCountry(countryCode);
    setSelectedCity('');
    if (countryCode) {
      const selectedCountryData = countries.find((country) => country.alpha2Code === countryCode);
      if (selectedCountryData) {
        const countryCities = selectedCountryData.capital ? [selectedCountryData.capital[0]] : [];
        setCities(countryCities);
      }
    } else {
      setCities([]);
    }
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
  };

  return (
    <div>
      <CountrySelector countries={countries} onSelectCountry={handleSelectCountry} />
      <CitySelector cities={cities} onSelectCity={handleSelectCity} />

      {selectedCountry && selectedCity && (
        <div>
          <h2>Selected Location:</h2>
          <p>Country: {selectedCountry}</p>
          <p>City: {selectedCity}</p>
        </div>
      )}
    </div>
  );
};

export default Search;
