import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./customInput.css";

function CustomInput(props) {
  const [isNull, setIsnull] = useState(true);
  const [isPassword, setIspassword] = useState(false);
  const [show, setShow] = useState(false);

  const checkNull = (e) => {
    const { value } = e.target;

    if (value === null || value === "") {
      setIsnull(true);
    } else {
      setIsnull(false);
    }
    props.handleChange(e);
  };

  const toggleShow = () => {
    setShow((prevState) => !prevState);
  };

  useEffect(() => {
    if (props.type === "password") {
      setIspassword(true);
    }
  }, []);

  return (
    <div className="customInputContainer">
      <input
        autoComplete="off"
        className={isNull ? "inputInActive" : "inputActive"}
        onChange={props.handleChange !== null ? (e) => checkNull(e) : null}
        type={show ? "text" : props.type}
        onFocus={
          props.handleFocus !== null ? (e) => props.handleFocus(e) : null
        }
        onBlur={props.handleBlur !== null ? (e) => props.handleBlur(e) : null}
        style={{
          height: props.height || "15px",
          width: props.width || "228px",
          borderRadius: props.borderRadius || "2px",
          backgroundColor: props.backgroundColor || "#f6f6f6",
          border: "0.5px solid #dbdbdb",
          margin: props.margin,
          padding: props.padding,
        }}
      />
      <span className={isNull ? "placeholderInActive" : "placeholderActive"}>
        {props.placeholder}
      </span>
      {isPassword ? (
        !isNull ? (
          <span className="showButton" onClick={toggleShow || null}>
            Show
          </span>
        ) : null
      ) : null}
    </div>
  );
}

CustomInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  handleFocus: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  borderRadius: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  margin: PropTypes.string.isRequired,
  padding: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default CustomInput;
