import React from 'react';
//import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Icon from './assets/images/favicon.ico';

const Main = styled.main`
  color: black;
  width: 100vw;
  height: 100vh;
  `;

const App = () => {
  return (
    <>
    <Helmet>
      <title>MediBridge</title>
      <meta name="description" content="A Healthcare App" />
      <link rel="icon" type="image/png" href={Icon} />
    </Helmet>
    <Main>
      <Navbar />
    </Main>
    </>
  );
}

export default App;