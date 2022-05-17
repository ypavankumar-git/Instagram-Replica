import React from "react";
import Profile from "../components/profile/profile";
import Stories from "../components/stories/stories";

function ProfilePage() {
  return (
    <div className="profilePageWrapper">
      <Profile />
      <div className="profilePageStoriesWrapper">
        <Stories selfProfile />
      </div>
    </div>
  );
}

export default ProfilePage;
