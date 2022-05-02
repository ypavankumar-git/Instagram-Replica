import React, { useState } from "react";
//import "dotenv/config";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import "../style.css";
import { post} from "../../services/api_services/service";
import { encrypt } from "../../services/encryption_service/service";
import { appstore, googleplaystore, instagram, wrong, acceptable } from "../../assets/index";
import Links from "../links/links";
import { CustomInput } from "../index";
import store from "../../index";
    
const SignUp = () => {

    const signUpUrl = process.env.REACT_APP_SIGNUP_URL;
    const checkIdUrl = process.env.REACT_APP_CHECKID_URL;
    const checkUsernameUrl = process.env.REACT_APP_CHECKUSERNAME_URL;
    const secret = process.env.REACT_APP_SECRET;

    // console.log("in signup");
    // console.log(process.env);
    // console.log(checkUsernameUrl);

    const [id, setId] = useState(null);
    const [fullname, setFullname] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [idFocused, setIdfocused] = useState(true);
    // const [fullnameFocused, setFullnamefocused] = useState(false);
    const [usernameFocused, setUsernamefocused] = useState(true);
    const [idValid, setIdvalid] = useState(null);
    const [usernameValid, setUsernamevalid] = useState(true);
    const [allowSignin, setAllowSignin] = useState(false);

    const handleSubmit = () => {

      //e.preventDefault();

      console.log("handling submit");

      let body = {};

      if(id.indexOf('@') > -1){
        
      body = {
          "username": username,
          "password": encrypt(password, secret),
          "email": id,
          "fullname": fullname,
        }

      }
      else {

      body = {
          "username": username,
          "password": encrypt(password, secret),
          "mobile": id,
          "fullname": fullname,
        }
      }

      const res = post(signUpUrl, body);

      res.then(data => {


        if(data.id_token){
          setAllowSignin(true);
        }

        store.dispatch({
          type: "addTokens",
          payload: data
        })
      })
    }

    //CHECKS IF ID GIVEN IS VALID
    
    const checkIfIdisValid = (value) => { 

      console.log("value is" + value); 

      let body = {};

      if(value.indexOf('@') > -1){
        body = {
          "email":value
        }
      }
      else {
       body = {
          "mobile": value
        }
      }   
      
      const res = post(checkIdUrl, body);

      console.log(checkIdUrl);

      res.then((result) => {

        console.log(result.availability);

        if(result.availability === "Available"){
         
          setIdvalid(true);
          console.log("true setted");
        }
        else if(result.availability === "Alreadytaken"){
          setIdvalid(false);
          console.log("false setted");
        }

        setIdfocused(false); 
      })
    }

    //HANDLES BLURRING OF USERNAME FIELD

    const handleBlur = (value) => {

      let body = {};

        body = {
          "username":value
        }  
      
      const res = post(checkUsernameUrl, body);

      console.log("checkuser url is " + checkUsernameUrl);
      console.log(body);

      res.then((result) => {

        console.log(result.availability);

        if(result.availability === "Available"){
         
          setUsernamevalid(true);
          console.log("true setted");
        }
        else if(result.availability === "Alreadytaken"){
          setUsernamevalid(false);
          console.log("false setted");
        }

        setUsernamefocused(false);
      })
    }

  //   useEffect(() => {
  //     console.log(fullname);
  //  }, [fullname])

   return(
        <div className="mainContainer">
        <div className="upperContainer box card">
            <div className="instaTitleContainer">
              <img className = "insta" alt="Get it on Google Play" src={instagram}></img>
              <p>Sign up to see photos and videos from your friends.</p>
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
                {/* <div>
                  <input autoFocus className="id input box"
                    placeholder="Mobile number or email address"
                    required onChange={(e) => setId(e.target.value)}
                    onFocus={() => setIdfocused(true)}
                    onBlur={(e) => { checkIfIdisValid(e.target.value)} }
                  /> 
                  { idFocused ? null : <img className = "validationIcon" alt="" src={idValid ? acceptable : wrong}></img> }
                </div> */}

                <div className="df">
                  <CustomInput
                    placeholder="Mobile number or email address"
                    handleChange={e => setId(e.target.value)}
                    handleFocus={() => setIdfocused(true)}
                    handleBlur={e => checkIfIdisValid(e.target.value) }
                  />
                    { idFocused ? null : <img className = {"validationIcon " + (idValid ? "acceptable" : "wrong")} alt="" src={idValid ? acceptable : wrong}></img> }

                </div>
                
                {/* <div>
                  <input className="fullName input box"
                    placeholder="Full Name"
                    required onChange={e => setFullname(e.target.value)}
                  />
                  { (fullname === "" || fullname === null) ? null : <img className = "validationIcon" alt="" src={acceptable}></img> }
                </div>  */}

                <div className="df">
                  <CustomInput
                   placeholder="Full Name"
                   handleChange={e => setFullname(e.target.value)}
                   handleFocus={null}
                   handleBlur={null}
                  />
                   { (fullname === "" || fullname === null) ? null : <img className = "validationIcon acceptable" alt="" src={acceptable}></img> }
                </div>

                <div className="df">
                  <CustomInput 
                    placeholder="Username"
                    autoComplete="off"
                    required 
                    handleChange={e => setUsername(e.target.value)}
                    handleFocus={() => setUsernamefocused(true)}
                    handleBlur={e => handleBlur(e.target.value)}
                  /> 
                  { !usernameFocused ? <img className = "validationIcon" alt="" src={usernameValid ? acceptable : wrong}></img> : null}
                </div> 
 
                <CustomInput 
                  type="password"
                  placeholder="Password" 
                  handleChange={e => setPassword(e.target.value)}
                  handleFocus={null}
                  handleBlur={null}
                />

               {(allowSignin === true) ?  <Navigate to="/homed" /> : null}

                <button className="submitButton" onClick={handleSubmit}>Sign Up</button>

                <p className="termsAndConditions">By signing up, you agree to our <strong>Terms, Data Policy</strong> and <strong>Cookie Policy</strong></p>

            </div>
        </div>

        <div className="lowerContainer box card">
          <p className="question">Have an account?</p>
          <Link className="link" to="/login">Log In</Link>
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

     {/* <footer><Links/></footer>  */}

    </div> 
    )
}

export default SignUp;