import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Profile = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 30px;
`;

const Card = styled.div`
  background-color: #fff;
  color: black;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const Title = styled.h2`
  text-align: center;
  color: #D2691E;
`;

const PlaceholderText = styled.p`
  color: #999;
  font-style: italic;
`;

const ProfileInformation = ({ patientInfo }) => {
  return (
    <Card>
      <Title>Profile Information</Title>
      {patientInfo ? (
        <>
          <p>Name: {patientInfo.name}</p>
          <p>Age: {patientInfo.age}</p>
          <p>Email: {patientInfo.email}</p>
          <p>Gender: {patientInfo.gender}</p>
        </>
      ) : (
        <PlaceholderText>No profile information available.</PlaceholderText>
      )}
    </Card>
  );
};

const PersonalDashboard = () => {
  const [patientInfo, setPatientInfo] = useState(null);
  
  useEffect(() => {
    // Fetch patient's profile information from the server
    const Token = localStorage.getItem('token');
    console.log(Token);
    const fetchPatientInfo = async () => {
      try {
        const response = await axios.get('https://medibridge.onrender.com/user/', {
          headers: {
            'Content-Type': 'application/json',
            'Access-Token': `Bearer ${Token}`,
        },
        });
        setPatientInfo(response.data.user);
        console.log('This is the data',response.data.userData);
        localStorage.setItem('userData', response.data.userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPatientInfo();
  }, []);
  return (
    <Profile>
      <ProfileInformation patientInfo={patientInfo} />
    </Profile>
  );
};

export default PersonalDashboard;
