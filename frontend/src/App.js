import { styled } from "styled-components";
import LandingPage from "./pages/LandingPage.jsx";

const Body = styled.main`
  padding: 0;
  margin: 0
`

function App() {
  return (
    <Body>
      <LandingPage />
    </Body>
  );
}

export default App;
