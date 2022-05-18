import React, { useState } from "react";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import "../style.css";
import { post } from "../../services/apiServices/service";
import { encrypt } from "../../services/encryptionService/service";
import { appstore, googleplaystore, instagram } from "../../assets/index";
import { CustomInput } from "../index";
import Validate from "../../utilities/validate";
import urlConstants from "../../constants/urlConstants";
import messageConstants from "../../constants/messageConstants";
import inputTypeConstants from "../../constants/inputTypeConstants";
import toastTypeConstants from "../../constants/toastTypeConstants";
import showToast from "../../services/toasterService/showToast";

function Login() {
  const login_url = urlConstants.BACKEND_HOST + urlConstants.LOGIN_URL;
  const secret = process.env.REACT_APP_SECRET;

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [wrongUsername, setWrongusername] = useState(null);
  const [wrongPassword, setWrongpassword] = useState(null);

  const handleSubmit = async (e) => {
    setWrongusername(null);
    setWrongpassword(null);

    let body = {};

    const type = Validate(username);

    const encrypted_password = await encrypt(password, secret);

    if (type === inputTypeConstants.EMAIL) {
      body = {
        email: username,
        password: encrypted_password,
      };
    } else if (type === inputTypeConstants.MOBILE) {
      body = {
        mobile: username,
        password: encrypted_password,
      };
    } else if (type === inputTypeConstants.NAME) {
      body = {
        username,
        password: encrypted_password,
      };
    }

    post(login_url, body).then((data) => {
      if (data.message === messageConstants.WRONG_USERNAME) {
        setWrongusername(true);
      } else if (data.message === messageConstants.WRONG_PASSWORD) {
        setWrongpassword(true);
      } else {
        showToast(toastTypeConstants.SUCCESS, "Logged in Successfully", 2000);
        setWrongusername(false);
        setWrongpassword(false);
      }

      localStorage.setItem("auth_token", data.id_token);
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
            style={{ marginBottom: "40px" }}
          />
        </div>
        <div className="inputContainer">
          <CustomInput
            placeholder="Phone number, username or email address"
            handleChange={(e) => setUsername(e.target.value)}
            handleFocus={null}
            handleBlur={null}
          />

          <CustomInput
            placeholder="password"
            type="password"
            handleChange={(e) => setPassword(e.target.value)}
            handleFocus={null}
            handleBlur={null}
          />

          {wrongUsername === false && wrongPassword === false ? (
            <Navigate to="/home" />
          ) : null}

          <button
            className="submitButton canDisable"
            onClick={handleSubmit}
            disabled={!(username !== "" && Validate(password) === "password")}
          >
            Log In
          </button>

          <div className="facebookOptions">
            <div className="orDiv">
              <div className="line" />
              <p>OR</p>
              <div className="line"> </div>
            </div>

            <div className="loginWithFacebook">
              <div className="fStyling">f</div>
              <p>Log in with Facebook</p>
            </div>

            {wrongUsername ? (
              <p className="wrongUsername">
                {messageConstants.WRONG_USERNAME_VALIDATION_INFO}
              </p>
            ) : wrongPassword ? (
              <p className="wrongPassword">
                {messageConstants.WRONG_PASSWORD_VALIDATION_INFO}
              </p>
            ) : null}

            <div className="forgotPassword">Forgotten your password?</div>
          </div>
        </div>
      </div>

      <div className="lowerContainer box card">
        <p className="question">Dont have an account?</p>
        <Link className="link" to="/signup">
          Sign up
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

export default Login;
