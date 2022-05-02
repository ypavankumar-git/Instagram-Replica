import React, { useState } from "react";
//import "dotenv/config";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import "../style.css";
import { post } from "../../services/api_services/service";
import { encrypt } from "../../services/encryption_service/service";
import { setTokens } from "../../redux/actions/token";
import Validate from "../../utilities/validate";
import {
  appstore,
  googleplaystore,
  instagram,
  wrong,
  acceptable,
} from "../../assets/index";
//import Links from "../links/links";
import { CustomInput } from "../index";
import store from "../../index";
import * as messages from "../../constants/signup";
import * as urls from "../../constants/urls";

const SignUp = () => {
  const signUpUrl = urls.BACKEND_HOST + urls.SIGNUP_URL;
  const checkIdUrl = urls.BACKEND_HOST + urls.CHECKID_URL;
  const checkUsernameUrl = urls.BACKEND_HOST + urls.CHECKUSERNAME_URL;
  const secret = process.env.REACT_APP_SECRET;

  const [id, setId] = useState(null);
  const [fullname, setFullname] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [idFocused, setIdfocused] = useState(true);
  const [usernameFocused, setUsernamefocused] = useState(true);
  const [idValid, setIdvalid] = useState();
  const [usernameValid, setUsernamevalid] = useState(true);
  const [allowSignin, setAllowSignin] = useState(false);

  const handleSubmit = () => {
    console.log("handling submit");

    let body = {};
    const encrypted_password = password;
    const type = Validate(id);

    if (type === 'email') {
      body = {
        username: username,
        password: encrypted_password,
        email: id,
        fullname: fullname,
      };
    } else if(type === 'mobile') {
      body = {
        username: username,
        password: encrypted_password,
        mobile: id,
        fullname: fullname,
      };
    }

    post(signUpUrl, body).then((data) => {
      console.log(data);
      if (data.id_token) {
        setAllowSignin(true);
        console.log(allowSignin);
      }

      store.dispatch(setTokens(data));

    });
  };

  const checkIfIdisValid = async (value) => {
    let body = {};

    if (Validate(value) === 'email') {
      body = {
        email: value,
      };
    } else if (Validate(value) === 'mobile') {
      body = {
        mobile: value,
      };
    }
    else {
      await setIdvalid(false);
      await setIdfocused(false);
      console.log(idValid, idFocused);
      return;
    }

    const res = post(checkIdUrl, body);

    res.then((result) => {
      if (result.availability === "Available") {
        setIdvalid(true);
      } else if (result.availability === "Alreadytaken") {
        setIdvalid(false);
      }
      setIdfocused(false);
    });
  };

  const handleBlur = (value) => {
    let body = {};

    body = {
      username: value,
    };

    const res = post(checkUsernameUrl, body);

    res.then((result) => {
      if (result.availability === "Available") {
        setUsernamevalid(true);
      } else if (result.availability === "Alreadytaken") {
        setUsernamevalid(false);
      }
      setUsernamefocused(false);
    });
  };

  return (
    <div className="mainContainer">
      <div className="upperContainer box card">
        <div className="instaTitleContainer">
          <img
            className="insta"
            alt="Get it on Google Play"
            src={instagram}
          ></img>
          <p>{messages.SIGNUP_INFO}</p>
        </div>
        <div className="inputContainer">
          <button className="loginWithFacebookButton">
            <div className="f">f</div>
            <p>Log in with Facebook</p>
          </button>
          <div className="orDiv">
            <div className="line"></div>
            <p>OR</p>
            <div className="line"> </div>
          </div>

          <div className="df">
            <CustomInput
              placeholder="Mobile number or email address"
              handleChange={(e) => setId(e.target.value)}
              handleFocus={() => setIdfocused(true)}
              handleBlur={(e) => checkIfIdisValid(e.target.value)}
            />
            {idFocused ? null : (
              <img
                className={
                  "validationIcon " + (idValid ? "acceptable" : "wrong")
                }
                alt=""
                src={idValid ? acceptable : wrong}
              ></img>
            )}
          </div>

          <div className="df">
            <CustomInput
              placeholder="Full Name"
              handleChange={(e) => setFullname(e.target.value)}
              handleFocus={null}
              handleBlur={null}
            />
            {fullname === "" || fullname === null ? null : (
              <img
                className="validationIcon acceptable"
                alt=""
                src={acceptable}
              ></img>
            )}
          </div>

          <div className="df">
            <CustomInput
              placeholder="Username"
              autoComplete="off"
              required
              handleChange={(e) => setUsername(e.target.value)}
              handleFocus={() => setUsernamefocused(true)}
              handleBlur={(e) => handleBlur(e.target.value)}
            />
            {!usernameFocused ? (
              <img
                className="validationIcon"
                alt=""
                src={usernameValid ? acceptable : wrong}
              ></img>
            ) : null}
          </div>

          <CustomInput
            type="password"
            placeholder="Password"
            handleChange={(e) => setPassword(e.target.value)}
            handleFocus={null}
            handleBlur={null}
          />

          {allowSignin === true ? <Navigate to="/homed" /> : null}

          <button className="submitButton" onClick={handleSubmit}>
            Sign Up
          </button>

          <p className="termsAndConditions">
            By signing up, you agree to our <strong>Terms, Data Policy</strong>{" "}
            and <strong>Cookie Policy</strong>
          </p>
        </div>
      </div>

      <div className="lowerContainer box card">
        <p className="question">Have an account?</p>
        <Link className="link" to="/login">
          Log In
        </Link>
      </div>

      <div className="applinkContainer">
        <div className="paraContainer">
          <p>Get the app</p>
        </div>

        <div className="storeContainer">
          <img
            className="storeIcon"
            alt="Get it on Google Play"
            src={googleplaystore}
          ></img>
          <img
            className="storeIcon"
            alt="Get it on App Store"
            src={appstore}
          ></img>
        </div>
      </div>

      {/* <footer><Links/></footer>  */}
    </div>
  );
};

export default SignUp;
