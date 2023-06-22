import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import styled from 'styled-components';
import LoginForm from '../pages/Login';
import RegistrationForm from '../pages/Signup';
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

const Navbar = () => {
  return (
    <Router>
      <Nav>
          <NavLinks>
            <NavLink>
              <Link to="/">Home</Link>
            </NavLink>
            <NavLink>
              <Link to="/login">Login</Link>
            </NavLink>
            <NavLink>
              <Link to="/signup">Signup</Link>
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
        <Route path="signup" element={<RegistrationForm/>} />
        <Route path="/dashboard" element={<ProfileData/>} />
        <Route path="/doctor-reviews" element={<DoctorReviews/>} />
        <Route path="/messages" element={<Messages/>} />
        <Route path="/appointment" element={<Appointments/>} />
      </Routes>
    </Router>
  );
};

export default Navbar;