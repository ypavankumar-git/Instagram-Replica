import "./stories.css";
import SampleStories from "../../services/sampleStories";
import ConvertObjectToMap from "../../utilities/objectToMap";

const Stories = ({ selfProfile }) => {
  const stories = ConvertObjectToMap(SampleStories);

  //   const addStoryImage = <div className="addStory">+</div>;
  //   const addStoryUsername = "New";

  //   if (selfProfile) {
  //     const map = new Map();
  //     map.set("imageurl", addStoryImage);
  //     map.set("username", addStoryUsername);

  //     stories.unshift(map);
  //   }

  const Story = ({ source }) => {
    return (
      <div className="story">
        <div className="storyImage">
          <img
            className="clickable"
            src={source.get("imageurl")}
            alt={source.get("username")}
          />
        </div>
        <p className="username clickable">{source.get("username")}</p>
      </div>
    );
  };

  return (
    <div className="storyContainer">
      {selfProfile ? (
        <div className="story">
          <div className="storyImage addStoryIcon clickable">
            <p className="addStory">+</p>
          </div>
          <p className="username clickable">New</p>
        </div>
      ) : null}
      {stories.map((story) => (
        <Story key={story.get("username")} source={story} />
      ))}
    </div>
  );
};

export default Stories;
