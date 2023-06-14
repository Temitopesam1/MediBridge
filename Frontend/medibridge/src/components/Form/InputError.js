// input error
import styles from "./Form.module.css";
import styles from "styles-components";

const InputError = ({ show }) => {
  return (
    <span className={`input-error ${show && 'show'}`}>
      Please complete this required field.
    </span>
  );
};

export default InputError;

const  ErrorInput = styles(InputError)`
input-error {
  display: none;
  font-size: 1.4rem;
  font-weight: 400;
  color: #c87872;
  margin-top: 0.2rem;
}

.input-error.show {
  display: block;

}

https://pastecord.com/pyvipihixy.typescript