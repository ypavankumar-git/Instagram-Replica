import React from "react";
import "./notFound.css";
import { sadEmoji } from "../../assets/index";

const NotFound = () => {
  return (
    <div className="notFoundPageContainer">
      <img src={sadEmoji} alt="sad" className="sadEmoji" />
      <p className="notFoundMessage1">404</p>
      <p className="notFoundMessage2">PAGE NOT FOUND</p>
    </div>
  );
};

export default NotFound;
