import { useState } from "react";
import { Header } from "../components/index";
import FeedsSection from "../sections/feedsSection/feedsSection";
//import Profile from "../components/profile/profile";
import Stories from "../components/stories/stories";
import Posts from "../components/posts/posts";
import ProfileSection from "../sections/profileSection/profileSection";
import "./style.css";

const HomePage = () => {
  const [showFeeds, setShowFeeds] = useState(true);
  console.log(showFeeds);

  return (
    <div className="homePageWrapper">
      <Header showFeeds={setShowFeeds} />
      {/* <Stories selfProfile={false} /> */}
      {showFeeds ? (
        <div className="feedsWrapper">
          <div className="homePageStoriesWrapper">
            <Stories selfProfile={false} />
          </div>
          <FeedsSection />
        </div>
      ) : null}
      {!showFeeds ? (
        <div className="profileWrapper">
          <ProfileSection />
        </div>
      ) : null}
    </div>
  );
};

export default HomePage;
