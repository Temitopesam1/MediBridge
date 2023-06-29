import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './pages/Login';
import DoctorRegistrationForm from './components/Form/DoctorRegister';
import PatientRegistrationForm from './components/Form/PatientRegister';
import ProfileData from './pages/PersonalDashboard';
import DoctorReviews from './pages/DoctorsReview';
import Messages from './pages/Messages';
import Appointments from './pages/Appointments';
import LandingPage from './pages/LandingPage';
import RegistrationPageContainer from './components/RegisterAddon/RegistrationPageContainer';
import Header from './components/Header';
import Footer from "./components/Footer";



const App = () => {
  return (
    <div>

      <Navbar />
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/registration"
          element={<RegistrationPageContainer />
          }
        />
        <Route path="/registration/doctor-registration" element={<DoctorRegistrationForm />} />
        <Route path="/registration/patient-registration" element={<PatientRegistrationForm />} />
        <Route path="/dashboard" element={<ProfileData />} />
        <Route path="/doctor-reviews" element={<DoctorReviews />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/appointment" element={<Appointments />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
