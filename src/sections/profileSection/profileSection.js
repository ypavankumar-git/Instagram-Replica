import Profile from "../../components/profile/profile";
import Stories from "../../components/stories/stories";
import Posts from "../../components/posts/posts";
import "./profileSection.css";

const ProfilePage = () => {
  return (
    <div className="profileWrapper">
      <Profile />
      <div className="profilePageStoriesWrapper">
        <Stories selfProfile={true} />
      </div>
      <Posts />
    </div>
  );
};

export default ProfilePage;
