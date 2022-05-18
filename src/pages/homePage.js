import React, { useState } from "react";
import { Header } from "../components/index";
import FeedsSection from "../sections/feedsSection/feedsSection";
import Stories from "../components/stories/stories";
import ProfileSection from "../sections/profileSection/profileSection";
import "./style.css";

function HomePage() {
  const [showFeeds, setShowFeeds] = useState(true);

  return (
    <div className="homePageWrapper">
      <Header showFeeds={setShowFeeds} />
      {showFeeds ? (
        <div className="feedsWrapper">
          <div className="homePageStoriesWrapper">
            <Stories selfProfile={false} />
          </div>
          <FeedsSection />
        </div>
      ) : null}
      {!showFeeds ? (
        <ProfileSection />
      ) : null}
    </div>
  );
}

export default HomePage;
