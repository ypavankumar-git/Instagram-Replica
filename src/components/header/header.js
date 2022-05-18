import React, {useState }from "react";
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
  profileBlackAndWhite,
  switcher,
  save,
  profileSettings
} from "../../assets/index";
import store from "../../redux/store/store";

function Header(props) {

  const [showProfileCard, setShowProfileCard] = useState(false);
  const toggleProfileCard = () => {
    setShowProfileCard(prevState => !prevState) ;
  }
  const handleProfileClick = () => {
    setShowProfileCard(false);
    props.showFeeds(false);
  }
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
            onClick={() => toggleProfileCard()}
          />
         { showProfileCard ? <div className="profileCard clickable">
            <div className="profileCardOptions">
              <div className="profileCardOptionsIconContainer">
                <img className="profileCardOptionsIcon" src={profileBlackAndWhite}/>
              </div>
              <p className="profileCardOptionsTitle" onClick={() => handleProfileClick()}>
                Profile
              </p>
            </div>
            <div className="profileCardOptions">
            <div className="profileCardOptionsIconContainer">
              <img className="profileCardOptionsIcon" src={save}/>
              </div>
              <p className="profileCardOptionsTitle">
                Save
              </p>
            </div>
            <div className="profileCardOptions">
            <div className="profileCardOptionsIconContainer">
              <img className="profileCardOptionsIcon" src={profileSettings}/>
              </div>
              <p className="profileCardOptionsTitle">
                Settings
              </p>
            </div>
            <div className="profileCardOptions">
            <div className="profileCardOptionsIconContainer">
              <img className="profileCardOptionsIcon" src={switcher}/>
              </div>
              <p className="profileCardOptionsTitle">
                Switch accounts
              </p>
            </div>
            <p className="logoutOption" 
            onClick={() => {
              handleLogOut();
              <Navigate to="/login" />;
        }}>
              Log out
            </p>
            <div className="arrowHand"></div>
          </div>
          
         : null }
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  showFeeds: PropTypes.func,
};

export default Header;
