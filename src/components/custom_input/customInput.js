import React, { useState, useEffect } from "react";
import "./customInput.css";

const CustomInput = (props) => {

const [isNull, setIsnull] = useState(true);
const [isPassword, setIspassword] = useState(false);
const [show, setShow] = useState(false);

const checkNull = (e) => {

    console.log("value is");

    const value = e.target.value;
  if(value === null || value === ""){
    setIsnull(true);
  }
  else {
      setIsnull(false);
  }
  props.handleChange(e);
}

const toggleShow = () => {
    setShow(prevState => !prevState);
}

useEffect(() => {
    if(props.type === "password"){
        setIspassword(true);
    }
}, [])
   
    return(
        <div className="customInputContainer">
            <input 
            autoComplete="off"
            className={isNull ? "inputInActive" : "inputActive"}
            onChange={props.handleChange !== null ? e => checkNull(e) : null}
            type= {show ? "text" : props.type}
            onFocus= {props.handleFocus !== null ? e => props.handleFocus(e) : null}
            onBlur= {props.handleBlur !== null ? e => props.handleBlur(e) : null}
            style={{
                height: props.height || "15px",
                width: props.width || "228px",
                borderRadius: props.borderRadius || "2px",
                backgroundColor: props.backgroundColor || "#f6f6f6",
                border: "0.5px solid #dbdbdb",
                margin: props.margin,
                padding: props.padding

        }}/>
            <span className={isNull ? "placeholderInActive" : "placeholderActive"}>{props.placeholder}</span>
            {isPassword ? !isNull ? <span 
               className="showButton"
               onClick={toggleShow || null}
               >Show</span> : null : null}
        </div>
    )
}

export default CustomInput;
