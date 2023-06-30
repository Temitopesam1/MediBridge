import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PersonalDashboard.css';

const ProfileInformation = ({ patientInfo }) => {
  return (
    <div className="profile-container">
      <h2 className="title">Profile Information</h2>
      {patientInfo ? (
        <>
          <p className="info-item">
            <span className="info-label">Name:</span> {patientInfo.fullName}
          </p>
          <p className="info-item">
            <span className="info-label">Age:</span> {patientInfo.age}
          </p>
          <p className="info-item">
            <span className="info-label">Email:</span> {patientInfo.email}
          </p>
          <p className="info-item">
            <span className="info-label">Gender:</span> {patientInfo.gender}
          </p>
          <p className="info-item">
            <span className="info-label">Job:</span> {patientInfo.job}
          </p>
          <p className="info-item">
            <span className="info-label">Allergies:</span> {patientInfo.allergies}
          </p>
          <p className="info-item">
            <span className="info-label">Surgeries:</span> {patientInfo.surgeries}
          </p>
        </>
      ) : (
        <p className="placeholder-text">No profile information available.</p>
      )}
    </div>
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
        setPatientInfo(response.data.userData._doc);
        console.log('This is the data',response.data.userData);
        localStorage.setItem('userData', response.data._doc);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPatientInfo();
  }, []);
  return (
      <ProfileInformation patientInfo={patientInfo} />
  );
};

export default PersonalDashboard;
