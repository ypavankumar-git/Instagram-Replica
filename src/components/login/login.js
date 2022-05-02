import React, { useState, useEffect } from "react";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import "../style.css";
import { post } from "../../services/api_services/service";
//import { encrypt, decrypt } from "../../services/encryption_service/service";
import { appstore, googleplaystore, instagram } from "../../assets/index";
import { CustomInput } from "../index";
import { setTokens } from "../../redux/actions/token";
import store from "../../redux/store/store";
import GetFeeds from "../../firebase/getFeeds";
import Validate from "../../utilities/validate";
import * as validationMessages from "../../constants/login";
import * as urls from "../../constants/urls";
import * as jose from "jose";

const Login = () => {
  const login_url = urls.BACKEND_HOST + urls.LOGIN_URL;
  const secret = process.env.REACT_APP_SECRET;
  // const tokenState = useSelector(state => state.TokenReducer);
  //const tokenState = store.getState().TokenReducer;

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [wrongUsername, setWrongusername] = useState(null);
  const [wrongPassword, setWrongpassword] = useState(null);

  const handleSubmit = (e) => {
    setWrongusername(null);
    setWrongpassword(null);

    let body = {};

    const type = Validate(username);
    const encrypted_password = password;

    if (type === "email") {
      body = {
        email: username,
        password: encrypted_password,
      };
    } else if (type === "mobile") {
      body = {
        mobile: username,
        password: encrypted_password,
      };
    } else if (type === "name") {
      body = {
        username: username,
        password: encrypted_password,
      };
    }

    post(login_url, body).then((data) => {
      console.log(data);
      if (data.message === "Wrong UserName") {
        setWrongusername(true);
      } else if (data.message === "Wrong Password") {
        setWrongpassword(true);
      } else {
        setWrongusername(false);
        setWrongpassword(false);
      }

      //store.dispatch(setTokens(data));
      //window.Cookies = data.id_token;

      localStorage.setItem("auth_token", data.id_token);

      const parsedData = jose.decodeJwt(data.id_token, secret);
      console.log(parsedData);
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
          ></img>
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
            <Navigate to="/homed" />
          ) : null}

          <button className="submitButton" onClick={handleSubmit}>
            Log In
          </button>

          <div className="facebookOptions">
            <div className="orDiv">
              <div className="line"></div>
              <p>OR</p>
              <div className="line"> </div>
            </div>

            <div className="loginWithFacebook">
              <div className="f">f</div>
              <p>Log in with Facebook</p>
            </div>

            {wrongUsername ? (
              <p className="wrongUsername">
                {validationMessages.WRONG_USERNAME}
              </p>
            ) : wrongPassword ? (
              <p className="wrongPassword">
                {validationMessages.WRONG_PASSWORD}
              </p>
            ) : null}

            <div className="forgotPassword">Forgotten your password?</div>
          </div>
        </div>
      </div>

      <div className="lowerContainer box card">
        <p className="question">Don't have an account?</p>
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
          ></img>
          <img
            className="storeIcon"
            alt="Get it on App Store"
            src={appstore}
          ></img>
        </div>
      </div>

      {/* <Links/> */}
    </div>
  );
};

export default Login;
