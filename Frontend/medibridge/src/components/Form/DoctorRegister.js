import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Logo from '../../assets/images/newLogo.jpeg';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
`;

const Select = styled.select`
  padding: 10px;
  width: 200px;
  border: 1px solid #ccc;
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
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-top: 10px;
`;

const Textarea = styled.textarea`
  padding: 5px;
  border: .5px solid #ccc;
  border-radius: 5px;
  width: 180px;
  margin-bottom: 4px;
`;

const Span = styled.span`
  font-size: 12px;
`;

const CheckboxContainer = styled.div`
  margin-bottom: 4px;
  font-family: Arial;
`;

const Error = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: linear-gradient(to left, #4776E6, #8e54e9);
  color: #fff;
  width: 220px;
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

function DoctorRegistrationForm() {
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    age: '',
    charges: '',
    password: '',
    email: '',
    specialty: '',
    licenseNumber: '',
    education: '',
    contactNumber: '',
    officeAddress: '',
    availability: '',
    gender: '',
    homeAddress: '',
    department: '',
    areasOfExpertise: [],
    provider: true
  });
  const [error, setError] = useState('');

  const handleRegisterFormChange = (event) => {
    setRegisterForm({ ...registerForm, [event.target.name]: event.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setRegisterForm((prevFormData) => ({
      ...prevFormData,
      [name]: checked ? [...prevFormData[name], e.target.value] : prevFormData[name].filter((value) => value !== e.target.value),
    }));
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();

    // Validate inputs
    if (
      !registerForm.fullName ||
      !registerForm.password ||
      !registerForm.email ||
      !registerForm.age ||
      !registerForm.gender ||
      !registerForm.charges ||
      !registerForm.homeAddress ||
      !registerForm.officeAddress ||
      !registerForm.availability ||
      !registerForm.contactNumber ||
      !registerForm.education ||
      !registerForm.licenseNumber ||
      !registerForm.specialty ||
      !registerForm.areasOfExpertise ||
      !registerForm.department
    ) {
      setError('Please fill all fields!');
      return;
    }

    // Post the form data to the backend
    axios.get('https://medibridge.onrender.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerForm),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Reset the form
        setRegisterForm({
          fullName: '',
          age: '',
          charges: '',
          password: '',
          email: '',
          specialty: '',
          licenseNumber: '',
          education: '',
          contactNumber: '',
          officeAddress: '',
          availability: '',
          gender: '',
          homeAddress: '',
          department: '',
          areasOfExpertise: [],
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
            name="fullName"
            value={registerForm.fullName}
            placeholder='Full Name'
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
          <Input
            type="password"
            name="password"
            value={registerForm.password}
            placeholder='Enter Password'
            onChange={handleRegisterFormChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="email"
            name="email"
            value={registerForm.email}
            placeholder='Enter Email'
            onChange={handleRegisterFormChange}
          />
        </FormGroup>
        <FormGroup>
        <Input
          type="text"
          name="specialty"
          placeholder="Specialty"
          value={registerForm.specialty}
          onChange={handleRegisterFormChange}
        />
        </FormGroup>
        <FormGroup>
        <Input
          type="text"
          name="licenseNumber"
          placeholder="License Number"
          value={registerForm.licenseNumber}
          onChange={handleRegisterFormChange}
        />
        </FormGroup>
        <FormGroup>
        <Input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={registerForm.contactNumber}
          onChange={handleRegisterFormChange}
        />
        </FormGroup>
        <FormGroup>
        <Input
          type="text"
          name="officeAddress"
          placeholder="Office Address"
          value={registerForm.officeAddress}
          onChange={handleRegisterFormChange}
        />
        </FormGroup>
        <FormGroup>
        <Input
          type="text"
          name="availability"
          placeholder="Availability"
          value={registerForm.availability}
          onChange={handleRegisterFormChange}
        />
        </FormGroup>
        {/* <FormGroup>
        <Input
          type="text"
          name="acceptedInsurance"
          placeholder="Accepted Insurance Providers"
          value={registerForm.acceptedInsurance}
          onChange={handleRegisterFormChange}
        />
        </FormGroup>
        <FormGroup>
        <Input
          type="text"
          name="profilePicture"
          placeholder="Profile Picture"
          value={registerForm.gender}
          onChange={handleRegisterFormChange}
        />
        </FormGroup> */}
        <FormGroup>
          <Input
            type="number"
            name="charges"
            value={registerForm.charges}
            placeholder='Charge Per session'
            onChange={handleRegisterFormChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="department"
            value={registerForm.department}
            placeholder='Department'
            onChange={handleRegisterFormChange}
          />
        </FormGroup>
        <FormGroup>
        <Textarea
          name="homeAddress"
          placeholder="Home Address"
          value={registerForm.homeAddress}
          onChange={handleRegisterFormChange}
        ></Textarea>
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
        <Textarea
          name="education"
          placeholder="Education and Qualifications"
          value={registerForm.education}
          onChange={handleRegisterFormChange}
        ></Textarea>
        </FormGroup>
        {/* <FormGroup>
        <Textarea
          name="biography"
          placeholder="Professional Biography"
          value={registerForm.biography}
          onChange={handleRegisterFormChange}
        ></Textarea>
        </FormGroup>
        <FormGroup>
          <Textarea
          name="professionalMemberships"
          placeholder="Professional Memberships"
          value={registerForm.professionalMemberships}
          onChange={handleRegisterFormChange}
        ></Textarea>
        </FormGroup>
        <FormGroup>
        <Textarea
          name="researchPublications"
          placeholder="Research or Publications"
          value={registerForm.researchPublications}
          onChange={handleRegisterFormChange}
        ></Textarea>
        </FormGroup>
        <Label>Languages Spoken:</Label>
        <CheckboxContainer>
          <Input
            type="checkbox"
            name="languages"
            value="English"
            checked={registerForm.languages.includes('English')}
            onChange={handleCheckboxChange}
          />
          <Span>English</Span>
        </CheckboxContainer>
        <CheckboxContainer>
          <Input
            type="checkbox"
            name="languages"
            value="French"
            checked={registerForm.languages.includes('French')}
            onChange={handleCheckboxChange}
          />
          <Span>French</Span>
        </CheckboxContainer>
        <CheckboxContainer>
          <Input
            type="checkbox"
            name="languages"
            value="Portuguese"
            checked={registerForm.languages.includes('Portuguese')}
            onChange={handleCheckboxChange}
          />
          <Span>Portuguese</Span>
          </CheckboxContainer>
        <CheckboxContainer>
          <Input
            type="checkbox"
            name="languages"
            value="Swahili"
            checked={registerForm.languages.includes('Swahili')}
            onChange={handleCheckboxChange}
          />
          <Span>Swahili</Span>
          </CheckboxContainer>

          <CheckboxContainer>
          <Input
            type="checkbox"
            name="languages"
            value="Yoruba"
            checked={registerForm.languages.includes('Yoruba')}
            onChange={handleCheckboxChange}
          />
          <Span>Yoruba</Span>
          </CheckboxContainer>
          <CheckboxContainer>
          <Input
            type="checkbox"
            name="languages"
            value="Arabic"
            checked={registerForm.languages.includes('Arabic')}
            onChange={handleCheckboxChange}
          />
          <Span>Arabic</Span>
          </CheckboxContainer>
          <CheckboxContainer>
          <Input
            type="checkbox"
            name="languages"
            value="Amharic"
            checked={registerForm.languages.includes('Amharic')}
            onChange={handleCheckboxChange}
          />
          <Span>Amharic</Span>
          </CheckboxContainer>
          <CheckboxContainer>
          <Input
            type="checkbox"
            name="languages"
            value="Zulu"
            checked={registerForm.languages.includes('Zulu')}
            onChange={handleCheckboxChange}
          />
          <Span>Zulu</Span>
          </CheckboxContainer> */}
        <Label>Areas of Expertise:</Label>
        <CheckboxContainer>
          <Input
            type="checkbox"
            name="areasOfExpertise"
            value="Cardiology"
            checked={registerForm.areasOfExpertise.includes('Cardiology')}
            onChange={handleCheckboxChange}
          />
          <Span>Cardiology</Span>
        </CheckboxContainer>
        <CheckboxContainer>
          <Input
            type="checkbox"
            name="areasOfExpertise"
            value="Pediatrics"
            checked={registerForm.areasOfExpertise.includes('Pediatrics')}
            onChange={handleCheckboxChange}
          />
          <Span>Pediatrics</Span>
        </CheckboxContainer>
        <CheckboxContainer>
          <Input
            type="checkbox"
            name="areasOfExpertise"
            value="Gynecology"
            checked={registerForm.areasOfExpertise.includes('Gynecology')}
            onChange={handleCheckboxChange}
          />
          <Span>Gynecology</Span>
        </CheckboxContainer>
        <CheckboxContainer>
          <Input
            type="checkbox"
            name="areasOfExpertise"
            value="Neurology"
            checked={registerForm.areasOfExpertise.includes('Neurology')}
            onChange={handleCheckboxChange}
          />
          <Span>Neurology</Span>
        </CheckboxContainer>
        <CheckboxContainer>
          <Input
            type="checkbox"
            name="areasOfExpertise"
            value="Dentist"
            checked={registerForm.areasOfExpertise.includes('Dentist')}
            onChange={handleCheckboxChange}
          />
          <Span>Dentist</Span>
        </CheckboxContainer>
        <CheckboxContainer>
          <Input
            type="checkbox"
            name="areasOfExpertise"
            value="Ophthalmology"
            checked={registerForm.areasOfExpertise.includes('Ophthalmology')}
            onChange={handleCheckboxChange}
          />
          <Span>Ophthalmology</Span>
        </CheckboxContainer>
        {error && <Error>{error}</Error>}
        <Button type="submit">Register</Button>
      </Form>
    </FormContainer>
  );
}

export default DoctorRegistrationForm;