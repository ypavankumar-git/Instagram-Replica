import React, { useState } from "react";
import PropTypes from "prop-types";
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
import { CustomInput } from "../index";
import store from "../../index";
import * as messageConstants from "../../constants/messageConstants";
import * as urlConstants from "../../constants/urlConstants";
import * as inputTypeConstants from "../../constants/inputTypeConstants";

function SignUp() {
  const signUpUrl = urlConstants.BACKEND_HOST + urlConstants.SIGNUP_URL;
  const checkIdUrl = urlConstants.BACKEND_HOST + urlConstants.CHECKID_URL;
  const checkUsernameUrl =
    urlConstants.BACKEND_HOST + urlConstants.CHECKUSERNAME_URL;
  const secret = process.env.REACT_APP_SECRET;

  const [id, setId] = useState(null);
  const [fullname, setFullname] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [idFocused, setIdfocused] = useState(true);
  const [usernameFocused, setUsernamefocused] = useState(true);
  const [idValid, setIdvalid] = useState();
  const [PasswordValid, setPasswordValid] = useState(false);
  const [usernameValid, setUsernamevalid] = useState(true);
  const [allowSignin, setAllowSignin] = useState(false);

  const handleSubmit = () => {
    let body = {};
    const encrypted_password = encrypt(password, secret);
    const type = Validate(id);

    if (type === inputTypeConstants.EMAIL) {
      body = {
        username,
        password: encrypted_password,
        email: id,
        fullname,
      };
    } else if (type === inputTypeConstants.MOBILE) {
      body = {
        username,
        password: encrypted_password,
        mobile: id,
        fullname,
      };
    }

    post(signUpUrl, body).then((data) => {
      if (data.id_token) {
        setAllowSignin(true);
      }

      store.dispatch(setTokens(data));
    });
  };

  const checkIfIdisValid = async (value) => {
    let body = {};

    if (Validate(value) === inputTypeConstants.EMAIL) {
      body = {
        email: value,
      };
    } else if (Validate(value) === inputTypeConstants.MOBILE) {
      body = {
        mobile: value,
      };
    } else {
      await setIdvalid(false);
      await setIdfocused(false);
      return;
    }

    const res = post(checkIdUrl, body);

    res.then((result) => {
      if (result.availability === messageConstants.AVAILABLE) {
        setIdvalid(true);
      } else if (result.availability === messageConstants.ALREADY_TAKEN) {
        setIdvalid(false);
      }
      setIdfocused(false);
    });
  };

  const handleUserNameBlur = (value) => {
    let body = {};

    body = {
      username: value,
    };

    const res = post(checkUsernameUrl, body);

    res.then((result) => {
      if (result.availability === messageConstants.AVAILABLE) {
        setUsernamevalid(true);
      } else if (result.availability === messageConstants.ALREADY_TAKEN) {
        setUsernamevalid(false);
      }
      setUsernamefocused(false);
    });
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    if (Validate(value) === inputTypeConstants.PASSWORD) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  return (
    <div className="mainContainer">
      <div className="upperContainer box card">
        <div className="instaTitleContainer">
          <img className="insta" alt="Get it on Google Play" src={instagram} />
          <p>{messageConstants.SIGNUP_INFO}</p>
        </div>
        <div className="inputContainer">
          <button className="loginWithFacebookButton">
            <div className="f">f</div>
            <p>Log in with Facebook</p>
          </button>
          <div className="orDiv">
            <div className="line" />
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
                className={`validationIcon ${idValid ? "acceptable" : "wrong"}`}
                alt=""
                src={idValid ? acceptable : wrong}
              />
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
              />
            )}
          </div>

          <div className="df">
            <CustomInput
              placeholder="Username"
              autoComplete="off"
              required
              handleChange={(e) => setUsername(e.target.value)}
              handleFocus={() => setUsernamefocused(true)}
              handleBlur={(e) => handleUserNameBlur(e.target.value)}
            />
            {!usernameFocused ? (
              <img
                className="validationIcon"
                alt=""
                src={usernameValid ? acceptable : wrong}
              />
            ) : null}
          </div>

          <CustomInput
            type="password"
            placeholder="Password"
            handleChange={(e) => handlePasswordChange(e.target.value)}
            handleFocus={null}
            handleBlur={null}
          />

          {allowSignin === true ? <Navigate to="/homed" /> : null}

          <button
            className="submitButton canDisable"
            onClick={handleSubmit}
            disabled={
              !(idValid && usernameValid && PasswordValid && fullname !== null)
            }
          >
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
          />
          <img className="storeIcon" alt="Get it on App Store" src={appstore} />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
