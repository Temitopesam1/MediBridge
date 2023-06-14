// form input
import { useState } from "react";
import InputError from "./InputError";
import styles from "styles-components";
import styled from "styled-components";


const FormInput = ({
  name,
  id,
  placeholder,
  value,
  inputType,
  handleOnchange,
  required,
}) => {
  const [show, setShow] = useState(false);
  const [emptyInput, setEmptyInput] = useState(false);

  const handleOnBlur = () => {
    if (value === "") {
      setShow(true);
      setEmptyInput(true);
    } else {
      setShow(false);
      setEmptyInput(false);
    }
  };


  return (
    <>
      <input
        type={inputType}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        className={
          emptyInput
            ? "text-input error"
            : "text-input"
        }
        required={required ? true : false}
        onBlur={required ? handleOnBlur : null}
        onChange={handleOnchange}
      />
      {required && <InputError show={show} />}
    </>
  );
};

export default FormInput;

const Input = styled(FormInput)`
.text-input{
  width: 100%;
  height: 4rem;
  padding: 0.9rem 1rem;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.5;
  border: none;
  box-sizing: border-box;
}

.text-input.error{
  border-color: #c87872;
}

https://pastecord.com/pyvipihixy.typescript
