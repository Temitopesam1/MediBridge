import React, { useState } from 'react';
import './Navbar.css'
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LoginForm from '../pages/Login';
import DoctorRegistrationForm from './Form/DoctorRegister';
import PatientRegistrationForm from './Form/PatientRegister';
import ProfileData from '../pages/PersonalDashboard';
import DoctorReviews from '../pages/DoctorsReview';
import Messages from '../pages/Messages';
import Logout from '../pages/Logout';
//import MedicalArticles from './Articles';
import Appointments from '../pages/Appointments';
import LandingPage from '../pages/LandingPage';



const RegistrationPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const RegistrationFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const RadioButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const RadioButtonLabel = styled.label`
  margin-left: 10px;
`;

const RegisterButton = styled.button`
  padding: 10px 20px;
  background-color: #42b983;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;


const Navbar = () => {
const navigate = useNavigate();
  const [userType, setUserType] = useState('');
  //const [showForm, setShowForm] = useState(false);

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (userType === 'doctor') {
      navigate('registration/doctor-registration');
    } else if (userType === 'patient') {
      navigate('registration/patient-registration');
    }
  };

  
  return (
    <>
      <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
            <li>
              <Link to="/registration">Register</Link>
            </li>
            <li>
              <Link to="/dashboard">Personal Dashboard</Link>
            </li>
            <li>
              <Link to="/doctor-reviews">Doctors Review</Link>
            </li>
            <li>
              <Link to="/messages">Messages</Link>
            </li>
            {/* <NavLink>
              <Link to="/medical-articles">Medical Articles</Link>
  </NavLink> */}
            <li>
              <Link to="/appointment">Appointments</Link>
            </li>
          </ul>
        </nav>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route
          path="/registration"
          element={
            <RegistrationPageContainer>
              <h2>Registration Page</h2>
              <form onSubmit={handleFormSubmit}>
                <RegistrationFormContainer>
                <RadioButtonContainer>
                    <input
                      type="radio"
                      value="doctor"
                      checked={userType === 'doctor'}
                      onChange={handleUserTypeChange}
                    />
                    <RadioButtonLabel>
                    Doctor
                  </RadioButtonLabel>
                </RadioButtonContainer>
                <RadioButtonContainer>
                    <input
                      type="radio"
                      value="patient"
                      checked={userType === 'patient'}
                      onChange={handleUserTypeChange}
                    />
                    <RadioButtonLabel>
                    Patient
                  </RadioButtonLabel>
                </RadioButtonContainer>
                <RegisterButton type="submit" disabled={!userType}>
                  Register
                </RegisterButton>
                </RegistrationFormContainer>
              </form>
            </RegistrationPageContainer>
          }
        />
        <Route path="/registration/doctor-registration" element={<DoctorRegistrationForm />} />
        <Route path="/registration/patient-registration" element={<PatientRegistrationForm />} />
        <Route path="/dashboard" element={<ProfileData/>} />
        <Route path="/doctor-reviews" element={<DoctorReviews/>} />
        <Route path="/messages" element={<Messages/>} />
        <Route path="/appointment" element={<Appointments/>} />
      </Routes>
      </>
  );
};

export default Navbar;