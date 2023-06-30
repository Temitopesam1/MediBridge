import React, { useState } from 'react';
import styled from 'styled-components';

const Appointments = () => {
  const doctorsData = [
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
    // Add more doctors as needed
  ];

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchLocation, setSearchLocation] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const handleDoctorSelection = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleSearch = () => {
    // Perform search or filtering action based on the search location
    const filtered = doctorsData.filter(
      (doctor) =>
        doctor.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setFilteredDoctors(filtered);
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

      <DoctorsContainer>
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
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
                <BookButton disabled={selectedDoctor === doctor}>
                  Book a Clinic Visit
                </BookButton>
              </RatingAvailability>
            </DoctorCard>
          ))
        ) : (
          <NoDoctorsMessage>No doctors found.</NoDoctorsMessage>
        )}
      </DoctorsContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchSelect = styled.select`
  padding: 8px;
  margin-right: 10px;
  border-radius: 4px;
`;

const SearchInput = styled.input`
  padding: 8px;
  margin-right: 10px;
  border-radius: 4px;
`;

const SearchButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const DoctorsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const DoctorCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: 4px;
  border: 1px solid ${(props) => (props.selected ? '#007bff' : '#ccc')};
  cursor: pointer;
  transition: border-color 0.3s ease-in-out;

  &:hover {
    border-color: #007bff;
  }
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
`;

const Name = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Profession = styled.p`
  font-size: 14px;
  color: #04a7c3;
  margin-bottom: 5px;
`;

const Location = styled.p`
  font-size: 14px;
  margin-bottom: 5px;
`;

const Charges = styled.p`
  font-size: 14px;
  margin-bottom: 5px;
`;

const RatingAvailability = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Rating = styled.p`
  font-size: 14px;
  margin: 0;
`;

const Availability = styled.p`
  font-size: 14px;
  margin: 0;
`;

const BookButton = styled.button`
  padding: 8px 16px;
  background-color: ${({ disabled }) => (disabled ? '#ccc' : 'green')};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const NoDoctorsMessage = styled.p`
  font-size: 16px;
  color: #1e1e1e;
`;

export default Appointments;
