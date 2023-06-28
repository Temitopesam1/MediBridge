import React, { useState } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LoginForm from '../pages/Login';
import DoctorRegistrationForm from './Form/DoctorRegister';
import PatientRegistrationForm from './Form/PatientRegister';
import ProfileData from '../pages/PersonalDashboard';
import DoctorReviews from '../pages/DoctorsReview';
import Messages from '../pages/Messages';
//import MedicalArticles from './Articles';
import Appointments from '../pages/Appointments';
import LandingPage from '../pages/LandingPage';

const Nav = styled.nav`
  background: ${(props) => props.theme.navbarBackground};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  color: white;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  color: white;
`;

const NavLink = styled.li`
  margin-right: 1rem;
  color: white;
  text-decoration: none;
  a{
    margin-left: 20px;
    color: #43014a;
    text-decoration: none;

    &:hover {
      color: #f9d7fc;
    }

    &:active {
      color: #066f80;
    }
  }
`;

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
      <Nav>
          <NavLinks>
            <NavLink>
              <Link to="/">Home</Link>
            </NavLink>
            <NavLink>
              <Link to="/login">Login</Link>
            </NavLink>
            <NavLink>
              <Link to="/registration">Register</Link>
            </NavLink>
            <NavLink>
              <Link to="/dashboard">Personal Dashboard</Link>
            </NavLink>
            <NavLink>
              <Link to="/doctor-reviews">Doctors Review</Link>
            </NavLink>
            <NavLink>
              <Link to="/messages">Messages</Link>
            </NavLink>
            {/* <NavLink>
              <Link to="/medical-articles">Medical Articles</Link>
  </NavLink> */}
            <NavLink>
              <Link to="/appointment">Appointments</Link>
            </NavLink>
          </NavLinks>
        </Nav>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm/>} />
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