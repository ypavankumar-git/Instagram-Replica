import React from "react";
import Profile from "../../components/profile/profile";
import Stories from "../../components/stories/stories";
import Posts from "../../components/posts/posts";
import "./profileSection.css";

function ProfileSection() {
  return (
    <div className="profileWrapper">
      <Profile />
      <div className="profilePageStoriesWrapper">
        <Stories selfProfile />
      </div>
      <div className="mobileView-ProfileCounts">
        <div className="mobileView-Box">
          <p className="mobileView-Count">0</p>
          <p className="mobileView-Title">posts</p>
        </div>
        <div className="mobileView-Box">
          <p className="mobileView-Count">300</p>
          <p className="mobileView-Title">followers</p>
        </div>
        <div className="mobileView-Box">
          <p className="mobileView-Count">300</p>
          <p className="mobileView-Title">following</p>
        </div>
        <div className="mobileView-Followers"></div>
        <div className="mobileView-Following"></div>
      </div>
      <Posts />
    </div>
  );
}

export default ProfileSection;
