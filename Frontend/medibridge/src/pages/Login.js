import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
//import PersonalDashboard from './PersonalDashboard';
//import { AuthContext } from '../components/Auth/AuthContext';
import Logo from '../assets/images/newLogo.jpeg';
import axios from 'axios';


const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 150px;
  height: 50px;
  margin: 0;
  position: relative;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;

  &:first-child {
    margin: 0;
  }
`;

const Error = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: linear-gradient(to left, #4776E6, #8e54e9);
  width: 180px;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.4rem;
  cursor: pointer;

  &:hover {
    background: #ccc;
  }
`;

export default function LoginForm({ setIsLoggedIn }) {
  //const {  setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate()
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleLoginFormChange = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };

  const handleLoginSubmit = (event, setIsLoggedIn) => {
  event.preventDefault();
  // Validate inputs
  if (!loginForm.email || !loginForm.password) {
    setError('Please fill in all the fields.');
    return;
  }
  const userValues = `${loginForm.email}:${loginForm.password}`;
  const encoded = btoa(userValues);
  const headers= {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${encoded}`,
    }
  // Post the form data to the backend
  axios.get('https://medibridge.onrender.com/login', {
    headers,
  })
    .then((response) =>{
      console.log(response);
      const data = response.data;
      console.log(data);
      const axiosToken = data.accessToken;
      localStorage.setItem('token', axiosToken);
      console.log(data.accessToken);
      console.log(axiosToken);
      // Reset the form
      setLoginForm({
        email: '',
        password: '',
      });
      setError('');

      // Assuming the login is successful and you receive an authentication token
      // Update the authentication state and redirect the user
      if (data.accessToken) {
        navigate('/dashboard');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      setError('Error logging in.');
    });
};

  return (
    <FormContainer>
      <LogoContainer>
        <LogoImage src={Logo} alt='Logo Image' />
      </LogoContainer>
      <Form onSubmit={(event) => handleLoginSubmit(event, setIsLoggedIn)}>
        <FormGroup>
          <Input
            type="email"
            name="email"
            value={loginForm.email}
            placeholder='Enter Email'
            onChange={handleLoginFormChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="password"
            value={loginForm.password}
            placeholder='Enter Password'
            onChange={handleLoginFormChange}
          />
        </FormGroup>
        {error && <Error>{error}</Error>}
        <Button type="submit">Login</Button>
      </Form>
    </FormContainer>
  );
}
