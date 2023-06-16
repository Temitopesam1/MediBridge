import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import styled from 'styled-components';
import LandingPage from './LandingPage';
import ProfileData from './PersonalDashboard';
import DoctorReviews from './DoctorsReview';
import Messages from './Messages';
import MedicalArticles from './Articles';
import Appointments from './Appointments';
import Footer from './Footer';

const Navbar = styled.nav`
  background: ${(props) => props.theme.navbarBackground};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
`;

const NavLink = styled.li`
  margin-right: 1rem;
`;

const App = () => {
  return (
    <div>
    <Router>
      <Navbar>
          <NavLinks>
            <NavLink>
              <Link to="/">Home</Link>
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
            <NavLink>
              <Link to="/medical-articles">Medical Articles</Link>
            </NavLink>
            <NavLink>
              <Link to="/appointment">Appointments</Link>
            </NavLink>
          </NavLinks>
        </Navbar>

      <Routes>
        <Route exact path="/" element ={<LandingPage/>} />
        <Route path="/dashboard" element={<ProfileData/>} />
        <Route path="/doctor-reviews" element={<DoctorReviews/>} />
        <Route path="/messages" element={<Messages/>} />
        <Route path="/medical-articles" element={<MedicalArticles/>} />
        <Route path="/appointment" element={<Appointments/>} />
      </Routes>
    </Router>

    <Footer />
    </div>
  );
};

export default App;

