import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Title = styled.h2`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Error = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

function LoginForm() {
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleLoginFormChange = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    // Validate inputs
    if (!loginForm.username || !loginForm.password) {
      setError('Please fill in all the fields.');
      return;
    }

    // Post the form data to the backend
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginForm),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Reset the form
        setLoginForm({
          username: '',
          password: '',
        });
        setError('');
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Error logging in.');
      });
  };

  return (
    <FormContainer>
      <Title>Login Form</Title>
      <Form onSubmit={handleLoginSubmit}>
        <FormGroup>
          <Label>Username:</Label>
          <Input
            type="text"
            name="username"
            value={loginForm.username}
            onChange={handleLoginFormChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Password:</Label>
          <Input
            type="password"
            name="password"
            value={loginForm.password}
            onChange={handleLoginFormChange}
          />
        </FormGroup>
        {error && <Error>{error}</Error>}
        <Button type="submit">Login</Button>
      </Form>
    </FormContainer>
  );
}

export default LoginForm;