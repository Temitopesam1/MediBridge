import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
//import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Icon from './assets/images/favicon.ico';

const Main = styled.main`
  color: black;
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
      <Router>
        <Navbar />
      </Router>
    </Main>
    </>
  );
}

export default App;