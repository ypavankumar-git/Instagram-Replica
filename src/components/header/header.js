import React from "react";
import PropTypes from "prop-types";
import "./header.css";
import { Navigate } from "react-router";
import { useNavigate } from "react-router-dom";
import {
  instagram,
  search,
  explore,
  home,
  interests,
  messenger,
  posts,
  man,
  logout,
} from "../../assets/index";
import store from "../../redux/store/store";

function Header(props) {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    store.dispatch({
      type: "clearFeeds",
      payload: null,
    });

    navigate("/login");
  };

  return (
    <div className="header">
      <div className="headerComponents">
        <div className="headerTitleContainer">
          <img
            className="headerTitle clickable"
            alt="INSTAGRAM"
            src={instagram}
            onClick={() => props.showFeeds(true)}
          />
          <div className="spacingAfterTitle" />
        </div>

        <div className="search">
          <img className="searchIcon clickable" src={search} alt="Search" />
          <span className="searchPlaceHolder">Search</span>
        </div>
        <div className="OptionsContainer">
          <div className="optionSpacing" />
          <img
            className="options"
            src={home}
            alt="home"
            onClick={() => props.showFeeds(true)}
          />
          <img className="options clickable" src={messenger} alt="messenger" />
          <img className="options clickable" src={posts} alt="posts" />
          <img className="options clickable" src={explore} alt="explore" />
          <img className="options clickable" src={interests} alt="interests" />
          <img
            className="options profileIcon clickable"
            src={man}
            alt="profile"
            onClick={() => props.showFeeds(false)}
          />
        </div>
      </div>
      <img
        src={logout}
        className="options logoutButton clickable"
        onClick={() => {
          handleLogOut();
          <Navigate to="/login" />;
        }}
        alt="logout"
      />
    </div>
  );
}

Header.propTypes = {
  showFeeds: PropTypes.func.isRequired,
};

export default Header;
