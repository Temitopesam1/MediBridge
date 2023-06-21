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

const Select = styled.select`
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

function RegistrationForm() {
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    email: '',
    age: '',
    gender: '',
    profession: '',
    profilePicture: '',
  });
  const [error, setError] = useState('');

  const handleRegisterFormChange = (event) => {
    setRegisterForm({ ...registerForm, [event.target.name]: event.target.value });
  };

  const fetchProfilePicture = () => {
    // Fetch the user's Gmail profile picture
    const profilePictureUrl = 'https://example.com/profile-picture.jpg';
    setRegisterForm({ ...registerForm, profilePicture: profilePictureUrl });
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();

    // Validate inputs
    if (
      !registerForm.username ||
      !registerForm.password ||
      !registerForm.email ||
      !registerForm.age ||
      !registerForm.gender ||
      !registerForm.profession
    ) {
      setError('Please fill in all the fields.');
      return;
    }

    // Post the form data to the backend
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerForm),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Reset the form
        setRegisterForm({
          username: '',
          password: '',
          email: '',
          age: '',
          gender: '',
          profession: '',
          profilePicture: '',
        });
        setError('');
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Error registering user.');
      });
  };

  return (
    <FormContainer>
      <Title>Registration Form</Title>
      <Form onSubmit={handleRegisterSubmit}>
        <FormGroup>
          <Label>Username:</Label>
          <Input
            type="text"
            name="username"
            value={registerForm.username}
            onChange={handleRegisterFormChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Password:</Label>
          <Input
            type="password"
            name="password"
            value={registerForm.password}
            onChange={handleRegisterFormChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Email:</Label>
          <Input
            type="email"
            name="email"
            value={registerForm.email}
            onChange={handleRegisterFormChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Age:</Label>
          <Input
            type="number"
            name="age"
            value={registerForm.age}
            onChange={handleRegisterFormChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Gender:</Label>
          <Select name="gender" value={registerForm.gender} onChange={handleRegisterFormChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Profession:</Label>
          <Input
            type="text"
            name="profession"
            value={registerForm.profession}
            onChange={handleRegisterFormChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Profile Picture:</Label>
          <Input
            type="text"
            name="profilePicture"
            value={registerForm.profilePicture}
            onChange={handleRegisterFormChange}
          />
          <Button type="button" onClick={fetchProfilePicture}>
            Fetch Picture
          </Button>
        </FormGroup>
        {error && <Error>{error}</Error>}
        <Button type="submit">Register</Button>
      </Form>
    </FormContainer>
  );
}

export default RegistrationForm;