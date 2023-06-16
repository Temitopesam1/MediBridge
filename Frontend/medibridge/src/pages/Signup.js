import styled from "styled-components";
import AuthHeader from "../components/Auth/AuthHeader";
import { MdEmail } from "react-icons/md";
import FormInput from "../components/Form/FormInput";
import FormPassword from "../components/Form/FormPassword";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginDetails({ ...loginDetails, [name]: value });
  };
  return (
    <>
      <AuthHeader title={"Login"} />
      <Wrapper>
        <form>
          <div className="form-group">
            <label htmlFor="email" className="label">
              Email Address:
            </label>
            <div className="input-box">
              <MdEmail className="input-icon" />
              <FormInput
                name={"email"}
                id={"email"}
                placeholder={"johndoe@email.com"}
                value={loginDetails.email}
                inputType={"email"}
                handleOnChange={handleOnChange}
                required={true}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="label">
              Password:
            </label>
            <div className="input-box">
              <span className="pass-icon">***</span>
              <FormPassword
                name={"password"}
                id={"password"}
                placeholder={"***********"}
                value={loginDetails.password}
                required={true}
                handleOnChange={handleOnChange}
              />
            </div>
          </div>
          <Link to="/forgot-password" className="form-link">
            Forgot password?
          </Link>
          <button type="submit" className="submit-btn">
            Login
          </button>
          <div className="form-link-box">
            <p>Don't have an account?</p>{" "}
            <Link to="/signup" className="form-link signup">
              Sign Up
            </Link>
          </div>
        </form>
      </Wrapper>
    </>
  );
};

export default Login;

const Wrapper = styled.main`
  padding: 4rem;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  form > *:not(:last-child) {
    margin-bottom: 2rem;
  }

  .form-group {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .label {
    min-width: 12rem;
    font-size: 1.8rem;
    font-weight: 500;
    color: var(--primary-color);
    margin-right: 1rem;
  }

  .input-icon {
    height: 2.5rem;
    width: 2.5rem;
    color: var(--primary-color);
    margin-right: 1rem;
  }

  .pass-icon {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary-color);
    text-decoration: underline;
    padding-bottom: 0;
    margin-right: 1rem;
  }

  .input-box {
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 2px solid var(--primary-color);
    padding: 0.5rem 1rem;
  }

  .form-link {
    text-align: end;
    text-transform: capitalize;
    font-size: 1.6rem;
    font-weight: 400;
    color: var(--secondary-color);
    text-decoration: none;
  }

  .submit-btn {
    width: calc(100% - 14rem);
    align-self: flex-end;
    text-align: center;
    padding: 1rem 0;
    border: none;
    outline: none;
    background: var(--primary-color);
    color: var(--light-color);
    border-radius: 5px;
    font-size: 1.6rem;
    font-weight: 400;
  }

  .form-link-box {
    width: calc(100% - 14rem);
    align-self: end;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form-link-box p {
    font-size: 1.6rem;
    color: var(--primary-color);
    font-weight: 400;
    margin-right: 0.4rem;
  }

  .form-link.signup {
    text-decoration: underline;
  }
`;
