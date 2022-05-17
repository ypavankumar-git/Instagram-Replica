import React from "react";
import Profile from "../../components/profile/profile";
import Stories from "../../components/stories/stories";
import Posts from "../../components/posts/posts";
import "./profileSection.css";

function ProfilePage() {
  return (
    <div className="profileWrapper">
      <Profile />
      <div className="profilePageStoriesWrapper">
        <Stories selfProfile />
      </div>
      <Posts />
    </div>
  );
}

export default ProfilePage;
