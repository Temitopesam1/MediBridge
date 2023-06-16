//import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import React from "react";

const CountrySelector = ({ countries, onSelectCountry }) => {
  return (
    <div>
      <label htmlFor="country">Select a country:</label>
      <select id="country" onChange={(e) => onSelectCountry(e.target.value)}>
        <option value="">-- Select Country --</option>
        {countries.map((country) => (
          <option key={country.alpha2Code} value={country.alpha2Code}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const CitySelector = ({ cities, onSelectCity }) => {
  return (
    <div>
      <label htmlFor="city">Select a city:</label>
      <select id="city" onChange={(e) => onSelectCity(e.target.value)}>
        <option value="">-- Select City --</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
};

export { CountrySelector, CitySelector };
