import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  gap: 295px;
  width: 100vw;
  height: 10vh;
  background: #F2FBFC;
  border-radius: 10px 10px 0px 0px;
  
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  li {
    padding: 20px 40px;
  }

  a {
    text-decoration: none;
  }
`;

const DoctorCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 20px;
  }

  h3 {
    margin: 0;
  }

  p {
    margin: 5px 0;
  }

  button {
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 20px;

  input[type='text'] {
    padding: 8px;
    font-size: 16px;
    border: none;
    text-decoration: underline;
  }
`;

const Search = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 30px 40px;
  gap: 15px;
  width: 1440px;
  height: 120px;
  background: #F2FBFC;
`;

const Appointments = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://example.com/api/doctors'); // Replace with your API endpoint
        setSearchResults(response.data);
      } catch (error) {
        console.log('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    setFilteredResults(
      searchResults.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchResults, searchQuery]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedCity('');
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleSearch = () => {
    const filteredDoctors = searchResults.filter(
      (doctor) =>
        doctor.country === selectedCountry && doctor.city === selectedCity
    );
    setFilteredResults(filteredDoctors);
  };

  return (
    <div>
      <Navbar>
        <h2>MediBridge</h2>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/purchase-medicines">Purchase Medicines</a>
          </li>
          <li>
            <a href="/lab-tests">Lab Tests</a>
          </li>
          <li>
            <a href="/notifications">
              <FontAwesomeIcon icon={faBell} className="bell-icon" style={{ fontSize: '24px', color: 'blue' }} />
            </a>
          </li>
          <li>
            <a href="./">
              <FontAwesomeIcon icon={faUser} className="user-icon" />
            </a>
          </li>
        </ul>
      </Navbar>

      <Search>
        <SearchContainer>
          <input
            type="text"
            placeholder="Search for doctors"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </SearchContainer>
        <div>
          <label>Country:</label>
          <select value={selectedCountry} onChange={handleCountryChange}>
            {/* Country options... */}
          </select>
        </div>
        <div>
          <label>City:</label>
          <select
            value={selectedCity}
            onChange={handleCityChange}
            disabled={!selectedCountry}
          >
            {/* City options based on selected country... */}
          </select>
        </div>
        <button
          onClick={handleSearch}
          disabled={!selectedCountry || !selectedCity}
        >
          Search
        </button>
      </Search>

      <div>
        {filteredResults.map((doctor, index) => (
          <DoctorCard key={index}>
            <img src={doctor.profilePicture} alt="Doctor Profile" />
            <div>
              <h3>{doctor.name}</h3>
              <p>Profession: {doctor.profession}</p>
              <p>Location: {doctor.location}</p>
              <p>Fee: {doctor.fee}</p>
              <p>Rating: {doctor.rating}</p>
              <p>Availability: {doctor.availability}</p>
              <button>Book Clinic Visit</button>
            </div>
          </DoctorCard>
        ))}
      </div>
    </div>
  );
};

export default Appointments;