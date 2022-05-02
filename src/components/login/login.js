import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
//import "dotenv/config";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import "../style.css";
import { post } from "../../services/api_services/service";
import { encrypt } from "../../services/encryption_service/service";
import { appstore, googleplaystore, instagram } from "../../assets/index";
import Links from "../links/links";
import { CustomInput } from "../index";
import { setTokens, clearTokens } from "../../redux/actions/token";
import store from "../../redux/store/store";
import GetFeeds from "../../firebase/getFeeds";

const Login = () => {

  console.log("inside login");

  const url = process.env.REACT_APP_LOGIN_URL;
  const secret = process.env.REACT_APP_SECRET;

  // const tokenState = useSelector(state => state.TokenReducer);
  const tokenState = store.getState().TokenReducer;

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [wrongUsername, setWrongusername] = useState(null);
  const [wrongPassword, setWrongpassword] = useState(null);

  const handleSubmit = (e) => {

    console.log("handling login");

    let body = {};

    if (username.indexOf("@") > -1) {
      body = {
        email: username,
        password: encrypt(password, secret),
      };
    } else if (!isNaN(username)) {
      body = {
        mobile: username,
        password: encrypt(password, secret),
      };
    } else {
      body = {
        username: username,
        password: encrypt(password, secret),
      };
    }

    const res = post(url, body);

    res.then(data => {

      if(data.message === "Wrong UserName"){
        setWrongusername(true);
      }
      else if(data.message === "Wrong Password"){
        setWrongpassword(true);
      }

      else {
        setWrongusername(false);
        setWrongpassword(false);
      }

      store.dispatch(setTokens(data));
      console.log("thisnis tokensate");
      console.log(store.getState().TokenReducer.accessToken);


      // console.log(store.getState().Tokens);
      // if(store.getState().Tokens){
      //   console.log(store.getState().Tokens);
      //   return  <Navigate to="/home"/> 
      // }
    })
  };

  useEffect(() =>{
    GetFeeds();
 }, [])

  return (
    <div className="mainContainer">
      <div className="upperContainer box card">
        <div className="instaTitleContainer">
          <img className = "insta" alt="Get it on Google Play" src={instagram}
            style={{marginBottom: "40px"}}
          ></img>
        </div>
        <div className="inputContainer">

          <CustomInput
             placeholder="Phone number, username or email address"
             handleChange={e => setUsername(e.target.value)}
             handleFocus={null}
             handleBlur={null}
          />

          <CustomInput
             placeholder="password"
             type="password"
             handleChange={e => setPassword(e.target.value)}
             handleFocus={null}
             handleBlur={null}
          />

          {(wrongUsername === false && wrongPassword === false) ?  <Navigate to="/homed" /> : null}
          
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

            {wrongUsername ? <p className="wrongUsername">The username that you've 
                 entered doesn't belong to an account. Please check your username 
                 and try again.</p> : null}

            {wrongPassword ? <p className="wrongPassword">Sorry, your password was 
                 incorrect. Please double-check your password.</p> : null}
            
            <div className="forgotPassword">
               Forgotten your password?
            </div>

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
          <img className = "storeIcon" alt="Get it on Google Play" src={googleplaystore}></img>
          <img className = "storeIcon" alt="Get it on App Store" src={appstore}></img>
        </div>
          
      </div>
      
      {/* <Links/> */}

    </div>
  );
};

export default Login;
