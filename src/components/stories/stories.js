import React from "react";
import PropTypes from "prop-types";
import "./stories.css";
import SampleStories from "../../services/sampleStories";
import ConvertObjectToMap from "../../utilities/objectToMap";

function Stories({ selfProfile }) {
  const stories = ConvertObjectToMap(SampleStories);

  function Story({ source }) {
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
  }

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
}

Stories.propTypes = {
  selfProfile: PropTypes.bool.isRequired,
  source: PropTypes.map.isRequired,
};

export default Stories;
