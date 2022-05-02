import LoginPage from "./loginPage";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import * as jose from "jose";
import store from "../redux/store/store";

const AuthorizedPages = ({ children }) => {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const secret = process.env.REACT_APP_SECRET;
  //console.log("Auth token: " + auth_token);

  const checkAndSetAuth = async () => {
    const auth_token = localStorage.getItem("auth_token");
    if (auth_token !== null) {
      const parsedData = jose.decodeJwt(auth_token, secret);
      console.log(parsedData);
      if (Date.now() >= parsedData.exp * 1000) {
        localStorage.clear();
        await store.dispatch({
          type: "clearFeeds",
          payload: null,
        });
        window.alert("Session Expired \nPlease Login again");
        setIsTokenValid(true);
      } else {
        // console.log(Date.now(), parsedData.exp * 1000);
        setIsTokenValid(false);
      }
    }
  };

  useEffect(() => {
    checkAndSetAuth();
    console.log(isTokenValid);
  }, []);

  return isTokenValid ? <Navigate to="/login" /> : children;
};

export default AuthorizedPages;
