import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Profile = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 30px;
`;

const Card = styled.div`
  background-color: #fff;
  color: black;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const Title = styled.h2`
  text-align: center;
  color: #D2691E;
`;

const PlaceholderText = styled.p`
  color: #999;
  font-style: italic;
`;

const ProfileInformation = ({ patientInfo }) => {
  return (
    <Card>
      <Title>Profile Information</Title>
      {patientInfo ? (
        <>
          <p>Name: {patientInfo.name}</p>
          <p>Date of Birth: {patientInfo.dateOfBirth}</p>
          <p>Email: {patientInfo.email}</p>
          {/* Display other profile information */}
        </>
      ) : (
        <PlaceholderText>No profile information available.</PlaceholderText>
      )}
    </Card>
  );
};

const AppointmentSchedule = ({ appointments }) => {
  return (
    <Card>
      <Title>Appointment Schedule</Title>
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
        <PlaceholderText>No upcoming appointments.</PlaceholderText>
      )}
    </Card>
  );
};

const MedicalHistory = ({ medicalHistory }) => {
  return (
    <Card>
      <Title>Medical History</Title>
      {medicalHistory.length > 0 ? (
        <div>
          <p>Symptoms: {medicalHistory.symptoms}</p>
        </div>
      ) : (
        <PlaceholderText>No medical history available.</PlaceholderText>
      )}
    </Card>
  );
};

const Medications = ({ medications }) => {
  return (
    <Card>
      <Title>Medications</Title>
      {medications.length > 0 ? (
        <>
          {/* Render medications information */}
        </>
      ) : (
        <PlaceholderText>No medications available.</PlaceholderText>
      )}
    </Card>
  );
};

const HealthMetrics = ({ healthMetrics }) => {
  return (
    <Card>
      <Title>Health Metrics</Title>
      {healthMetrics.length > 0 ? (
        <>
          {/* Render health metrics information */}
        </>
      ) : (
        <PlaceholderText>No health metrics available.</PlaceholderText>
      )}
    </Card>
  );
};

const Messaging = ({ messages }) => {
  return (
    <Card>
      <Title>Messaging and Communication</Title>
      {messages.length > 0 ? (
        <>
          {/* Render messaging and communication components */}
        </>
      ) : (
        <PlaceholderText>No messages available.</PlaceholderText>
      )}
    </Card>
  );
};

const HealthGoals = ({ healthGoals }) => {
  return (
    <Card>
      <Title>Health Goals</Title>
      {healthGoals.length > 0 ? (
        <>
          {/* Render health goals information */}
        </>
      ) : (
        <PlaceholderText>No health goals available.</PlaceholderText>
      )}
    </Card>
  );
};

const HealthEducation = ({ educationalResources }) => {
  return (
    <Card>
      <Title>Health Education and Resources</Title>
      {educationalResources.length > 0 ? (
        <>
          {/* Render educational resources information */}
        </>
      ) : (
        <PlaceholderText>No educational resources available.</PlaceholderText>
      )}
    </Card>
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
        const response = await axios.get('https://medibridge.onrender.com/users/recipients');
        setPatientInfo(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch patient's appointments from the server
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('https://medibridge.onrender.com/medibridge/appointments');
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
    patientInfo === null ||
    appointments.length === 0 ||
    medicalHistory.length === 0 ||
    medications.length === 0 ||
    healthMetrics.length === 0 ||
    messages.length === 0 ||
    healthGoals.length === 0 ||
    educationalResources.length === 0
  ) {
    // Render with dummy data
    const dummyPatientInfo = {
      name: 'John Doe',
      dateOfBirth: '01/01/1990',
      email: 'johndoe@example.com',
    };

    const dummyAppointments = [
      {
        id: 1,
        date: '2023-06-21',
        time: '10:00 AM',
        type: 'General Checkup',
      },
      {
        id: 2,
        date: '2023-06-25',
        time: '2:00 PM',
        type: 'Dental Cleaning',
      },
    ];

    const dummyMedicalHistory = [
      {
        provider: "qasxcvbhj76543234567890b",
        symptoms: "blurry sight",
        diagnosis: "blue ray",
        prescriptions: "anti-blueray glasses",
        notes: "I don't even know what to put here but I'm sure you got the point",
        createdAt: "2023-06-01T17:59:17.446Z",
        _id: "1qasxcvbn09iuhgvcx2wefghjm09uh"
}
    ];

    const dummyMedications = [];

    const dummyHealthMetrics = [];

    const dummyMessages = [];

    const dummyHealthGoals = [];

    const dummyEducationalResources = [];

    return (
      <Profile>
        <ProfileInformation patientInfo={dummyPatientInfo} />
        <AppointmentSchedule appointments={dummyAppointments} />
        <MedicalHistory medicalHistory={dummyMedicalHistory} />
        <Medications medications={dummyMedications} />
        <HealthMetrics healthMetrics={dummyHealthMetrics} />
        <Messaging messages={dummyMessages} />
        <HealthGoals healthGoals={dummyHealthGoals} />
        <HealthEducation educationalResources={dummyEducationalResources} />
      </Profile>
    );
  }

  return (
    <Profile>
      <ProfileInformation patientInfo={patientInfo} />
      <AppointmentSchedule appointments={appointments} />
      <MedicalHistory medicalHistory={medicalHistory} />
      <Medications medications={medications} />
      <HealthMetrics healthMetrics={healthMetrics} />
      <Messaging messages={messages} />
      <HealthGoals healthGoals={healthGoals} />
      <HealthEducation educationalResources={educationalResources} />
    </Profile>
  );
};

export default PersonalDashboard;
