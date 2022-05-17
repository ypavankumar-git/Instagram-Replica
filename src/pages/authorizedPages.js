import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Navigate } from "react-router";
import * as jose from "jose";
import store from "../redux/store/store";

function AuthorizedPages({ children }) {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const secret = process.env.REACT_APP_SECRET;

  const checkAndSetAuth = async () => {
    const auth_token = localStorage.getItem("auth_token");
    if (auth_token !== null) {
      const parsedData = jose.decodeJwt(auth_token, secret);
      if (Date.now() >= parsedData.exp * 1000) {
        localStorage.clear();
        await store.dispatch({
          type: "clearFeeds",
          payload: null,
        });
        window.alert("Session Expired \nPlease Login again");
        await setIsTokenValid(true);
      } else {
        await setIsTokenValid(false);
      }
    }
  };

  useEffect(() => {
    checkAndSetAuth();
  }, []);

  return isTokenValid ? <Navigate to="/login" /> : children;
}

AuthorizedPages.propTypes = {
  children: PropTypes.any,
};

export default AuthorizedPages;
