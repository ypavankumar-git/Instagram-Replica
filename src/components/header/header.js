import instagram from "../../assets/instagram.png";
import "./header.css";
import search from "../../assets/search.svg";
import explore from "../../assets/explore.svg";
import home from "../../assets/home.svg";
import interests from "../../assets/interests.svg";
import messenger from "../../assets/messenger.svg";
import posts from "../../assets/posts.svg";
import profile from "../../assets/profile.svg";
import man from "../../assets/man.png";
import { get } from "../../services/api_services/service";

const Header = () => {
     

    return (
        <div className="header">
         <div className="headerComponents">
         {/* <div className="spacingBeforeTitle"></div> */}
          <div className="headerTitleContainer">
            <img className = "headerTitle" alt="INSTAGRAM" src={instagram} />
            <div className="spacingAfterTitle"></div>
          </div>
          
          <div className="search">
            <img className="searchIcon" src={search} alt="Search"/>
            <span className="searchPlaceHolder">Search</span>
          </div>
          <div className="OptionsContainer">
              <div className="optionSpacing"></div>
              <img className="options" src={home} alt="home"/>
              <img className="options" src={messenger} alt="messenger"/>
              <img className="options" src={posts} alt="posts"/>
              <img className="options" src={explore} alt="explore"/>
              <img className="options" src={interests} alt="interests"/>
              <img className="options profileIcon" src={man} alt="profile"/>

          </div>
        </div>
        </div>
    )
}

export default Header;