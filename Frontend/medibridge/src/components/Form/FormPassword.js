import { useEffect, useRef, useState } from "react";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
//import InputError from "./InputError";
import styled from "styled-components";

const FormPassword = ({ name, id, value, placeholder, handleOnChange, required }) => {
  const [isVissible, setIsVissible] = useState(false);
  const [controlFocused, setControlFocused] = useState(false);
  const inputRef = useRef(null);
  const controlRef = useRef(null);
  const showPassword = () => {
    inputRef.current.type = "text";
    setIsVissible(true);
  };
  const hidePassword = () => {
    inputRef.current.type = "password";
    setIsVissible(false);
  };

  const [show, setShow] = useState(false);
  //const [emptyInput, setEmptyInput] = useState(false);

   const handleOnBlur = () => {
    if (value === "") {
      setShow(true);
      //setEmptyInput(true);
      setControlFocused(false);
    } else {
      setShow(false);
      //setEmptyInput(false);
      setControlFocused(false);
    }
  }; 

  useEffect(() => {
    let input = inputRef.current;
    const checkFocus = (e) => {
      setControlFocused(true);
    };

    input.addEventListener("focusin", checkFocus);

    return () => {
      input.removeEventListener("focusin", checkFocus);
    };
  }, []);

  return (
    <>
      <PasswordWrapper>
        <div
          ref={controlRef}
          className={`form-control ${controlFocused && "focus"} ${
            show && "error"
          }`}
        >
          <input
            type="password"
            name={name}
            id={id}
            value={value}
            className={"password-input"}
            ref={inputRef}
            placeholder={placeholder}
            required={required}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
          />
          {isVissible ? (
            <IoEyeOffSharp className={"form-icon"} onClick={hidePassword} />
          ) : (
            <IoEyeSharp className={"form-icon"} onClick={showPassword} />
          )}
        </div>
      </PasswordWrapper>

      {/* {required && <InputError show={show} />} */}
    </>
  );
};

export default FormPassword;

const PasswordWrapper = styled.div`
width: 100%;
  .password-input {
    background: transparent;
    outline: none;
    border: none;
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1.5;
    color: var(--primary-color);
    width: calc(100% - 2rem);
    outline: none;
    border: none;
  }

  .password-input::placeholder{
    font-size: 1.5rem;
    font-weight: 300;
    color: rgba(0, 56, 70, .6);
  }

  .form-icon {
    height: 2.5rem;
    width: 2.5rem;
    color: var(--primary-color);
  }

  .form-control {
    width: 100%;
    height: 4rem;
    display: flex;
    align-items: center;
    padding: 0.9rem 1rem;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    box-sizing: border-box;

  }
`;
