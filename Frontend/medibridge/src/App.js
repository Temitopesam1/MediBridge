import React from 'react';
//import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import styled from 'styled-components';
import BackgroundImage from './assets/images/MedicalBackground.jpg'

const Main = styled.main`
  color: white;
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
`

const App = () => {
  return (
    <Main>
      <Navbar />
    </Main>
  );
}

export default App;