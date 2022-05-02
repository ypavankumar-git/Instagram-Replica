import instagram from "../../assets/instagram.png";
import "./header.css";
import search from "../../assets/search.svg";
import explore from "../../assets/explore.svg";
import home from "../../assets/home.svg";
import interests from "../../assets/interests.svg";
import messenger from "../../assets/messenger.svg";
import posts from "../../assets/posts.svg";
import man from "../../assets/man.png";

const Header = (props) => {
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
          <div className="spacingAfterTitle"></div>
        </div>

        <div className="search">
          <img className="searchIcon clickable" src={search} alt="Search" />
          <span className="searchPlaceHolder">Search</span>
        </div>
        <div className="OptionsContainer">
          <div className="optionSpacing"></div>
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
    </div>
  );
};

export default Header;
