import React, {useState} from 'react'
// import { Navigate } from 'react-router-dom';
import styled from 'styled-components';





const RegistrationPageContainer = () => {

const RegistrationPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

    const RegistrationFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

    const RadioButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

    const RadioButtonLabel = styled.label`
  margin-left: 10px;
`;

    const RegisterButton = styled.button`
  padding: 10px 20px;
  background-color: #42b983;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

// const navigate = useNavigate();
const [userType, setUserType] = useState('');

const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (userType === 'doctor') {
    //   navigate('registration/doctor-registration');
    } else if (userType === 'patient') {
    //   navigate('registration/patient-registration');
    }
  };
    return (
        <RegistrationPageContainer>
            <h2>Registration Page</h2>
            <form onSubmit={handleFormSubmit}>
                <RegistrationFormContainer>
                    <RadioButtonContainer>
                        <input
                            type="radio"
                            value="doctor"
                            checked={userType === 'doctor'}
                            onChange={handleUserTypeChange}
                        />
                        <RadioButtonLabel>
                            Doctor
                        </RadioButtonLabel>
                    </RadioButtonContainer>
                    <RadioButtonContainer>
                        <input
                            type="radio"
                            value="patient"
                            checked={userType === 'patient'}
                            onChange={handleUserTypeChange}
                        />
                        <RadioButtonLabel>
                            Patient
                        </RadioButtonLabel>
                    </RadioButtonContainer>
                    <RegisterButton type="submit" disabled={!userType}>
                        Register
                    </RegisterButton>
                </RegistrationFormContainer>
            </form>
        </RegistrationPageContainer>
    )
}

export default RegistrationPageContainer