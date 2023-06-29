import React, {useState} from 'react'
 import { useNavigate } from 'react-router-dom';
import './register.css';

const RegistrationPageContainer = () => {

const navigate = useNavigate();
const [userType, setUserType] = useState('');

const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (userType === 'doctor') {
      navigate('doctor-registration');
    } else if (userType === 'patient') {
      navigate('patient-registration');
    }
  };
return (
  <div className="form-container">
    <form onSubmit={handleFormSubmit}>
      <div className="radio-group">
        <div>
          <input
            type="radio"
            id="doctor"
            value="doctor"
            checked={userType === 'doctor'}
            onChange={handleUserTypeChange}
          />
          <label htmlFor="doctor">Register as a Doctor</label>
        </div>
        <div>
          <input
            type="radio"
            id="patient"
            value="patient"
            checked={userType === 'patient'}
            onChange={handleUserTypeChange}
          />
          <label htmlFor="patient">Register as a Patient</label>
        </div>
      </div>
      <button type="submit" disabled={!userType}>
        Register
      </button>
    </form>
  </div>
);

}

export default RegistrationPageContainer