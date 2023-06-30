import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import getCurrentUser from '../Utils/getCurrentUser';
import Logout from '../Utils/logoutUser';
import decode from "jwt-decode";
import './Navbar.css';

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
    navigate('/')
  }


  return (
    <React.Fragment>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/about-us"}>About Us</Link>
          </li>
          <li>
            <Link to={"/articles"}>Articles</Link>
          </li>

          {!currentUser ? (
              <ul>
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
              <li>
                <Link to={"/registration"}>Register</Link>
              </li>
              </ul>
          ) : (
            <ul>
              <li>
                <Link to={"/dashboard"}>Personal Dashboard</Link>
              </li>
              <li>
                <Link to={"/doctor-reviews"}>Doctors Review</Link>
              </li>
              <li>
                <Link to={"/messages"}>Messages</Link>
              </li>
              <li>
                <Link to={"/appointment"}>Appointments</Link>
              </li>
              <li>
                <Link onClick={(e) => handleLogout(e)}>Logout</Link>
              </li>


            </ul>
          )}
        </ul>
      </nav>


    </React.Fragment>
  );
};

export default Navbar;