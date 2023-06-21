import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaBell, FaCalendarAlt, FaPills } from 'react-icons/fa';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import styled from 'styled-components';
import PersonalDashboard from '../pages/PersonalDashboard';
import Messages from '../pages/Messages';
import Appointments from '../pages/Appointments';

const Container = styled.div`
  display: flex;
`;

const SidebarWrapper = styled.div`
  width: 250px;
  padding: 20px;
  background-color: #f2f2f2;
`;

const ToggleButton = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const SidebarIcons = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000;
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 5px;

  &:hover {
    background-color: #ddd;
  }

  svg {
    margin-right: 10px;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <Router>
      <Container>
        {isOpen && (
          <SidebarWrapper>
            <SidebarIcons>
              <SidebarLink to="/dashboard" onClick={closeSidebar}>
                <FaUser /> Profile
              </SidebarLink>
              <SidebarLink to="/messages" onClick={closeSidebar}>
                <FaEnvelope /> Messages
              </SidebarLink>
              <SidebarLink to="/notifications" onClick={closeSidebar}>
                <FaBell /> Notifications
              </SidebarLink>
              <SidebarLink to="/appointments" onClick={closeSidebar}>
                <FaCalendarAlt /> Appointment Booking
              </SidebarLink>
              <SidebarLink to="/medications" onClick={closeSidebar}>
                <FaPills /> Medications
              </SidebarLink>
            </SidebarIcons>
          </SidebarWrapper>
        )}

        <ToggleButton isOpen={isOpen} className="toggle-button" onClick={toggleSidebar}>
          ☰
        </ToggleButton>

      <MainContent isOpen={isOpen}>
      <Routes>
        <Route path="/dashboard" element={<PersonalDashboard />} />
        <Route path="/messages" element={<Messages />} />
        {/*<Route path="/notifications" component={Notifications} />*/}
        <Route path="/appointments" element={<Appointments />} />
        {/*<Route path="/medications" component={Medications} />*/}
      </Routes>
      </MainContent>
      </Container>
    </Router>
  );
};

export default Sidebar;
