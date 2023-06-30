import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../assets/images/newLogo.jpeg';
import axios from '../../Utils/axioss';

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
    contactNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    homeAddress: '',
    job: '',
  });
  const [error, setError] = useState({
    fullName: '',
    age:'',
    gender: '',
    contactNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    homeAddress: '',
    job: '',

  });

  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleRegisterFormChange = (event) => {
    setRegisterForm({ ...registerForm, [event.target.name]: event.target.value });
  };


  const clearForm =  ()=>{
    setRegisterForm({
      fullName: '',
      age:'',
      gender: '',
      contactNumber: '',
      email: '',
      password: '',
      homeAddress: '',
      job: '',
    });
  }


  const handleRegisterSubmit = (event) => {
    event.preventDefault();

    // Validate inputs

    let error = {};
    let isValid = true;

    if (!registerForm.firstName) {
      error.firstName = "Full name is required";
      isValid = false;
    }

    if (!registerForm.email) {
      error.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.email)) {
      error.email = "Invalid email address";
      isValid = false;
    }

    if (!registerForm.password) {
      error.password = "Password is required";
      isValid = false;
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s:])([^\s]){8,}$/.test(
        registerForm.password
      )
    ) {
      error.password =
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one unique character";
      isValid = false;
    }

    if (!registerForm.confirmPassword) {
      error.confirmPassword = "Password is required";
      isValid = false;
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s:])([^\s]){8,}$/.test(
        registerForm.confirmPassword
      )
    ) {
      error.password =
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one unique character";
      isValid = false;
    }
    

    if (registerForm.confirmPassword !== registerForm.password) {
      error.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (
      !registerForm.fullName ||
      !registerForm.password ||
      !registerForm.email ||
      !registerForm.age ||
      !registerForm.gender ||
      !registerForm.contactNumber ||
      !registerForm.job ||
      !registerForm.homeAddress
    ) {
      error = 'Please fill all fields!';
      return;
    }
    setError(error);
    // Post the form data to the backend
    axios.post('register', JSON.stringify(registerForm))
      .then((data) => {
        if (isValid) {
        setSuccessMessage("Registration Successful!");
        navigate('/')
        // Reset the form
        clearForm()
        setError('');
      }
      })
      .catch((error) => {
        setError('Error registering user.');
      });
  };



  return (
    <FormContainer>
      <LogoContainer>
        <LogoImage src={Logo} alt='Logo Image' />
      </LogoContainer>
      {successMessage && <p>{successMessage}</p>}
      <Form onSubmit={handleRegisterSubmit}>
        <FormGroup>
          <Input
            type="text"
            name="fullName"
            value={registerForm.fullName}
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
          name="contactNumber"
          placeholder="Phone Number"
          value={registerForm.contactNumber}
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
          name="homeAddress"
          placeholder="Address"
          value={registerForm.homeAddress}
          onChange={handleRegisterFormChange}
          />
        </FormGroup>
        {/* <Label>Medical Condition:</Label>
        <CheckboxContainer>
          <Input
            type="checkbox"
            name="medicalCondition"
            value="Hypertensive"
            checked={registerForm.medicalCondition.includes('Hypertensive')}
            onChange={handleCheckboxChange}
          />
          <Span>Hypertensive</Span>
        </CheckboxContainer>
        <CheckboxContainer>
          <Input
            type="checkbox"
            name="medicalCondition"
            value="Diabetic"
            checked={registerForm.medicalCondition.includes('Diabetic')}
            onChange={handleCheckboxChange}
          />
          <Span>Diabetic</Span>
        </CheckboxContainer>
        <CheckboxContainer>
          <Input
            type="checkbox"
            name="medicalCondition"
            value="Smoking"
            checked={registerForm.medicalCondition.includes('Smoking')}
            onChange={handleCheckboxChange}
          />
          <Span>Smoking</Span>
          </CheckboxContainer>
        <FormGroup>
          <Input
          type="text"
          name="job"
          placeholder="Job *"
          value={registerForm.job}
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
        </FormGroup> */}
        {error && <Error>{error}</Error>}
        <Button type="submit">Register</Button>
      </Form>
    </FormContainer>
  );
}

export default PatientRegistrationForm;