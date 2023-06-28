import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import getCurrentUser from "../Utils/getCurrentUser"
import Logout from '../Utils/logoutUser';
import decode from "jwt-decode";


const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  color: white;
`;


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
  const currentUser = getCurrentUser()
  const navigate = useNavigate()
  const [logging, setLogout] = useState(false)

  if (currentUser) {
    const decodedToken = decode(currentUser);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      Logout()
      setLogout(true)
      navigate("/login")
    }
  }
  useEffect(() => {
  }, [logging])

  const handleLogout = (e) => {
    e.preventDefault()
    Logout()
    setLogout(true)
  }


  return (
    <React.Fragment>
      <Nav>
        <NavLinks>
          <NavLink>
            <Link to={"/"}>Home</Link>
          </NavLink>

          {!currentUser ? (
            <div>
              <NavLink>
                <Link to={"/login"}>Login</Link>
              </NavLink>
              <NavLink>
                <Link to={"/registration"}>Register</Link>
              </NavLink>
            </div>
          ) : (
            <div>
              <NavLink>
                <Link to={"/dashboard"}>Personal Dashboard</Link>
              </NavLink>
              <NavLink>
                <Link to={"/doctor-reviews"}>Doctors Review</Link>
              </NavLink>
              <NavLink>
                <Link to={"/messages"}>Messages</Link>
              </NavLink>
              <NavLink>
                <Link to={"/appointment"}>Appointments</Link>
              </NavLink>
              <NavLink>
                <Link onClick={(e) => handleLogout(e)}>Logout</Link>
              </NavLink>


            </div>
          )}
        </NavLinks>
      </Nav>


    </React.Fragment>
  );
};

export default Navbar;