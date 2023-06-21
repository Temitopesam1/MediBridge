import styled from "styled-components";
//import doctor from "./Form/images/doctor.png";
const AuthHeader = ({ title }) => {
  return (
    <Header>
      <h1>{title}</h1>
    </Header>
  );
};

export default AuthHeader;

const Header = styled.header`
  min-height: 30rem;
  width: 100%;
  box-sizing: border-box;
  /* background: var(--dark-color) url(); */
  background-position: top right;
  background-size: contain;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  padding-left: 4rem;

  h1 {
    font-size: 4vmax;
    color: var(--secondary-color);
    font-weight: 900;
    text-transform: uppercase;
  }
`;
