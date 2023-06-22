import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Appointments = () => {
  const dummyDoctorsData = [
    {
      id: 1,
      name: 'Dr. John Doe',
      profession: 'Dentist',
      location: 'New York',
      charges: '$100',
      rating: 4.5,
      availability: 'Mon-Fri',
      profileImage: 'https://example.com/profiles/dr-john-doe.jpg',
    },
    {
      id: 2,
      name: 'Dr. Jane Smith',
      profession: 'Ophthalmologist',
      location: 'Los Angeles',
      charges: '$150',
      rating: 4.8,
      availability: 'Mon-Sat',
      profileImage: 'https://example.com/profiles/dr-jane-smith.jpg',
    },
    // Add more dummy doctors as needed
  ];

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchLocation, setSearchLocation] = useState('');
  const [doctorsData, setDoctorsData] = useState([]);

  useEffect(() => {
    // Fetch doctor data from the database or an API
    const fetchDoctorsData = async () => {
      try {
        const response = await axios.get('/api/doctors');
        const data = response.data;
        setDoctorsData(data);
      } catch (error) {
        console.log('Error fetching doctor data:', error);
      }
    };

    fetchDoctorsData();
  }, []);

  const handleDoctorSelection = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleSearch = () => {
    // Perform search or filtering action based on the search location
    const filtered = dummyDoctorsData.filter(
      (doctor) =>
        doctor.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setDoctorsData(filtered);
  };

  return (
    <Container>
      <SearchContainer>
        <SearchSelect>
          <option value="">Select Profession</option>
          <option value="Dentist">Dentist</option>
          <option value="Ophthalmologist">Ophthalmologist</option>
          <option value="General medicine">General medicine</option>
          <option value="Gynecologist">Gynecologist</option>
          <option value="Pediatrician">Pediatrician</option>
        </SearchSelect>
        <SearchInput
          type="text"
          placeholder="Enter Location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </SearchContainer>

      {doctorsData.length > 0 ? (
        <DoctorsContainer>
          {doctorsData.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              onClick={() => handleDoctorSelection(doctor)}
              selected={selectedDoctor === doctor}
            >
              <ProfileImage src={doctor.profileImage} alt={doctor.name} />
              <DetailsContainer>
                <Name>{doctor.name}</Name>
                <Profession>{doctor.profession}</Profession>
                <Location>{doctor.location}</Location>
                <Charges>{doctor.charges} Consultation Fee</Charges>
              </DetailsContainer>
              <RatingAvailability>
                <Rating>{doctor.rating}</Rating>
                <Availability>{doctor.availability}</Availability>
                <BookButton disabled={selectedDoctor === doctor}>Book a Clinic Visit</BookButton>
              </RatingAvailability>
            </DoctorCard>
          ))}
        </DoctorsContainer>
      ) : (
        <NoDoctorsMessage>No doctors found.</NoDoctorsMessage>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  isolation: isolate;
  position: relative;
  box-sizing: border-box;
  padding: 30px 40px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  letter-spacing: 0px;
  width: 100vw;
  height: 250-x;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const SearchSelect = styled.select`
  padding: 0.5rem;
  margin-right: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  // Add additional styles as needed
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  // Add additional styles as needed
`;

const SearchButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  // Add additional styles as needed
`;

const DoctorsContainer = styled.div`
  display: flex;
  padding: 30px 40px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  height: 80px;
  width: 1360px;
  font-size: 12px;
`;

const DoctorCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 30px;
  flex: 1 0 0;
  padding: 0;
  border: 1px solid blue;
  width: 100vw;
  height: 150px;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

const DetailsContainer = styled.div`
  display: flex;
  position: relative;
  isolation: isolate;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0;
  font-size: 8px;
  height: 100
  box-sizing: border-box;
  flex: 1;
  margin: 0px 0px 0px 30px;
`;

const RatingAvailability = styled.div`
  display: flex;
  position: relative;
  isolation: isolate;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  box-sizing: border-box;
  align-self: stretch;
  margin: 0px 0px 0px 30px;
  height: 100%;
  width: 228.63px;
`;

const Name = styled.div`
  text-align: left;
  white-space: pre-wrap;
  font-synthesis: none;
  color: rgba(0, 56, 70, 1);
  font-style: normal;
  font-family: Sofia Sans;
  font-weight: 600;
  font-size: 24px;
  letter-spacing: 0px;
  text-decoration: none;
  text-transform: none;
  margin-bottom: 4px;
`;

const Profession = styled.p`
  color: #04a7c3;
  padding: 0;
  margin-bottom: 5px;
  line-height: 1;
  font-size: 16px;
  font-family: Sofia Sans;
`;

const Location = styled.p`
  color: #1e1e1e;
  font-size: 16px;
  padding: 0;
  margin-top: 4px;
  font-family: Sofia Sans;
`;

const Charges = styled.p`
  color: #1e1e1e;
  font-size: 20px;
  padding: 0;
  margin: 0;
  font-family: Sofia Sans;
  font-weight: 500;
`;

const Rating = styled.p`
  margin: 0;
  // Add additional styles as needed
`;

const Availability = styled.div`
  display: flex;
  align-items: center;
  color: #1e1e1e;
  font-size: 16px;
  font-family: Sofia Sans;
  margin-top: 0.5rem;
`;

const BookButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${({ disabled }) => (disabled ? '#ccc' : 'blue')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  // Add additional styles as needed
`;

const NoDoctorsMessage = styled.p`
  color: #1e1e1e;
  font-size: 20px;
  font-family: Sofia Sans;
`;

export default Appointments;
