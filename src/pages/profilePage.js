import Profile from "../components/profile/profile";
import Stories from "../components/stories/stories";

const ProfilePage = () => {
  return (
    <div className="profilePageWrapper">
      <Profile />
      <div className="profilePageStoriesWrapper">
        <Stories selfProfile={true} />
      </div>
    </div>
  );
};

export default ProfilePage;
