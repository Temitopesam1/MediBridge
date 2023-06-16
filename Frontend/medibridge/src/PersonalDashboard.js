import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Components for each page
const ProfileInformation = ({ patientInfo }) => {
  return (
    <div>
      <h2>Profile Information</h2>
      <p>Name: {patientInfo.name}</p>
      <p>Date of Birth: {patientInfo.dateOfBirth}</p>
      {/* Display other profile information */}
    </div>
  );
};

const AppointmentSchedule = ({ appointments }) => {
  return (
    <div>
      <h2>Appointment Schedule</h2>
      {appointments.length > 0 ? (
        <ul>
          {appointments.map(appointment => (
            <li key={appointment.id}>
              <p>Date: {appointment.date}</p>
              <p>Time: {appointment.time}</p>
              <p>Type: {appointment.type}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming appointments.</p>
      )}
    </div>
  );
};

const MedicalHistory = ({ medicalHistory }) => {
  return (
    <div>
      <h2>Medical History</h2>
      {/* Render medical history information */}
    </div>
  );
};

const Medications = ({ medications }) => {
  return (
    <div>
      <h2>Medications</h2>
      {/* Render medications information */}
    </div>
  );
};

const HealthMetrics = ({ healthMetrics }) => {
  return (
    <div>
      <h2>Health Metrics</h2>
      {/* Render health metrics information */}
    </div>
  );
};

const Messaging = ({ messages }) => {
  return (
    <div>
      <h2>Messaging and Communication</h2>
      {/* Render messaging and communication components */}
    </div>
  );
};

const HealthGoals = ({ healthGoals }) => {
  return (
    <div>
      <h2>Health Goals</h2>
      {/* Render health goals information */}
    </div>
  );
};

const HealthEducation = ({ educationalResources }) => {
  return (
    <div>
      <h2>Health Education and Resources</h2>
      {/* Render educational resources information */}
    </div>
  );
};

const PersonalDashboard = () => {
  const [patientInfo, setPatientInfo] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [medications, setMedications] = useState([]);
  const [healthMetrics, setHealthMetrics] = useState([]);
  const [messages, setMessages] = useState([]);
  const [healthGoals, setHealthGoals] = useState([]);
  const [educationalResources, setEducationalResources] = useState([]);

  useEffect(() => {
    // Fetch patient's profile information from the server
    const fetchPatientInfo = async () => {
      try {
        const response = await axios.get('http://192.168.43.107:3100/medibridge/users/recipients');
        setPatientInfo(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch patient's appointments from the server
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/patient/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch patient's medical history from the server
    const fetchMedicalHistory = async () => {
      try {
        const response = await axios.get('/api/patient/medical-history');
        setMedicalHistory(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch patient's medications from the server
    const fetchMedications = async () => {
      try {
        const response = await axios.get('/api/patient/medications');
        setMedications(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch patient's health metrics from the server
    const fetchHealthMetrics = async () => {
      try {
        const response = await axios.get('/api/patient/health-metrics');
        setHealthMetrics(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch patient's messages from the server
    const fetchMessages = async () => {
      try {
        const response = await axios.get('/api/patient/messages');
        setMessages(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch patient's health goals from the server
    const fetchHealthGoals = async () => {
      try {
        const response = await axios.get('/api/patient/health-goals');
        setHealthGoals(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch patient's educational resources from the server
    const fetchEducationalResources = async () => {
      try {
        const response = await axios.get('/api/patient/educational-resources');
        setEducationalResources(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPatientInfo();
    fetchAppointments();
    fetchMedicalHistory();
    fetchMedications();
    fetchHealthMetrics();
    fetchMessages();
    fetchHealthGoals();
    fetchEducationalResources();
  }, []);

  if (
    !patientInfo ||
    !appointments ||
    !medicalHistory ||
    !medications ||
    !healthMetrics ||
    !messages ||
    !healthGoals ||
    !educationalResources
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProfileInformation patientInfo={patientInfo} />
      <AppointmentSchedule appointments={appointments} />
      <MedicalHistory medicalHistory={medicalHistory} />
      <Medications medications={medications} />
      <HealthMetrics healthMetrics={healthMetrics} />
      <Messaging messages={messages} />
      <HealthGoals healthGoals={healthGoals} />
      <HealthEducation educationalResources={educationalResources} />
    </div>
  );
};

export default PersonalDashboard;
