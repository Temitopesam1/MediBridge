import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../assets/images/newLogo.jpeg';

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
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  padding: 10px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Error = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: linear-gradient(to left, #4776E6, #8e54e9);
  width: 200px;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: blue;
  }

  &:active {
    background: purple;
  }
`;

function PatientRegistrationForm() {
  const [registerForm, setRegisterForm] = useState({
   fullName: '',
   age:'',
    gender: '',
    phoneNumber: '',
    email: '',
    address: '',
    job: '',
    medicalConditions: '',
    surgeries: '',
    medications: '',
    allergies: '',
    familyHistory: '',
    insuranceProvider: '',
    policyNumber: '',
    paymentMethod: '',
    emergencyContactName: '',
    emergencyContactRelationship: '',
    emergencyContactPhone: '',
    preferredPhysician: '',
    preferredHospital: '', 
  });
  const [error, setError] = useState('');
  //const navigate = useNavigate();

  const handleRegisterFormChange = (event) => {
    setRegisterForm({ ...registerForm, [event.target.name]: event.target.value });
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
      !registerForm.phoneNumber ||
      !registerForm.job ||
      !registerForm.address ||
      !registerForm.medicalConditions ||
      !registerForm.surgeries ||
      !registerForm.medications ||
      !registerForm.allergies ||
      !registerForm.familyHistory ||
      !registerForm.insuranceProvider ||
      !registerForm.policyNumber ||
      !registerForm.paymentMethod ||
      !registerForm.preferredHospital ||
      !registerForm.preferredPhysician ||
      !registerForm.emergencyContactName ||
      !registerForm.emergencyContactPhone ||
      !registerForm.emergencyContactRelationship
    ) {
      setError('Please fill in all the fields.');
      return;
    }

    // Post the form data to the backend
    fetch('https://medibridge.onrender.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerForm),
    })
      .then((response) =>
      console.log(response))
      .then((data) => {
        console.log(data);
        // Reset the form
        setRegisterForm({
          fullName: '',
          age: '',
          gender: '',
          phoneNumber: '',
          email: '',
          address: '',
          job: '',
          medicalConditions: '',
          surgeries: '',
          medications: '',
          allergies: '',
          familyHistory: '',
          insuranceProvider: '',
          policyNumber: '',
          paymentMethod: '',
          emergencyContactName: '',
          emergencyContactRelationship: '',
          emergencyContactPhone: '',
          preferredPhysician: '',
          preferredHospital: '',
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
      <LogoContainer>
        <LogoImage src={Logo} alt='Logo Image' />
      </LogoContainer>
      <Form onSubmit={handleRegisterSubmit}>
        <FormGroup>
          <Input
            type="text"
            name="username"
            value={registerForm.username}
            placeholder='Full Name'
            onChange={handleRegisterFormChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="password"
            value={registerForm.password}
            placeholder='Password'
            onChange={handleRegisterFormChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="email"
            name="email"
            value={registerForm.email}
            placeholder='Email'
            onChange={handleRegisterFormChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="number"
            name="age"
            value={registerForm.age}
            placeholder='Age'
            onChange={handleRegisterFormChange}
          />
        </FormGroup>
        <FormGroup>
          <Select name="gender" value={registerForm.gender} onChange={handleRegisterFormChange}>
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={registerForm.phoneNumber}
          onChange={handleRegisterFormChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
          type="text"
          name="address"
          placeholder="Address"
          value={registerForm.address}
          onChange={handleRegisterFormChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
          type="text"
          name="job"
          placeholder="Job"
          value={registerForm.job}
          onChange={handleRegisterFormChange}
          />
        </FormGroup>
        <FormGroup>
        <Input
          type="text"
          name="medicalConditions"
          placeholder="Medical Conditions"
          value={registerForm.medicalConditions}
          onChange={handleRegisterFormChange}
        />
        </FormGroup>
        <FormGroup>
        <Input
          type="text"
          name="surgeries"
          placeholder="Surgeries"
          value={registerForm.surgeries}
          onChange={handleRegisterFormChange}
        />
        </FormGroup>
        <FormGroup>
        <Input
          type="text"
          name="medications"
          placeholder="Medications"
          value={registerForm.medications}
          onChange={handleRegisterFormChange}
        />
        </FormGroup>
        <FormGroup>
        <Input
          type="text"
          name="allergies"
          placeholder="Allergies"
          value={registerForm.allergies}
          onChange={handleRegisterFormChange}
        />
        </FormGroup>
        <FormGroup>
        <Input
          type="text"
          name="familyHistory"
          placeholder="Family Medical History"
          value={registerForm.familyHistory}
          onChange={handleRegisterFormChange}
        />
        </FormGroup>
        <FormGroup>
        <Input
          type="text"
          name="insuranceProvider"
          placeholder="Insurance Provider"
          value={registerForm.insuranceProvider}
          onChange={handleRegisterFormChange}
        />
        </FormGroup>
        <FormGroup>
        <Input
          type="text"
          name="policyNumber"
          placeholder="Policy Number"
          value={registerForm.policyNumber}
          onChange={handleRegisterFormChange}
        />
        </FormGroup>
        <FormGroup>
        <Input
          type="text"
          name="paymentMethod"
          placeholder="Payment Method"
          value={registerForm.paymentMethod}
          onChange={handleRegisterFormChange}
        />
        </FormGroup>
        <FormGroup>
        <Input
          type="text"
          name="emergencyContactName"
          placeholder="Emergency Contact Name"
          value={registerForm.emergencyContactName}
          onChange={handleRegisterFormChange}
        />
        </FormGroup>
        <FormGroup>
        <Input
          type="text"
          name="emergencyContactRelationship"
          placeholder="Emergency Contact Relationship"
          value={registerForm.emergencyContactRelationship}
          onChange={handleRegisterFormChange}
        />
        </FormGroup>
        <FormGroup>
        <Input
          type="text"
          name="emergencyContactPhone"
          placeholder="Emergency Contact Phone Number"
          value={registerForm.emergencyContactPhone}
          onChange={handleRegisterFormChange}
        />
        </FormGroup>
        <FormGroup>
        <Input
          type="text"
          name="preferredPhysician"
          placeholder="Preferred Physician"
          value={registerForm.preferredPhysician}
          onChange={handleRegisterFormChange}
        />
        </FormGroup>
        <FormGroup>
        <Input
          type="text"
          name="preferredHospital"
          placeholder="Preferred Hospital"
          value={registerForm.preferredHospital}
          onChange={handleRegisterFormChange}
        />
        </FormGroup>
        {error && <Error>{error}</Error>}
        <Button type="submit">Register</Button>
      </Form>
    </FormContainer>
  );
}

export default PatientRegistrationForm;