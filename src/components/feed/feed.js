import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  man,
  liked,
  notLiked,
  comment,
  share,
  save,
  emoji,
  settings,
  close,
  radioButton,
  radioButtonSelected,
} from "../../assets/index";
import "./feed.css";
import "./commentPopup.css";
import "./sharePopup.css";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import SampleComments from "../../services/sampleComments";
import ConvertObjectToMap from "../../utilities/objectToMap";
import SuggestedUsers from "../../services/sampleSuggestedUsers";

function Feed({ feed }) {
  const [likedPost, setLikedpost] = useState(false);
  const [commentPopup, setCommentPopup] = useState(false);
  const [sharePopup, setSharePopup] = useState(false);
  let newComment = null;

  const [commentsArr, setCommentsArr] = useState(
    ConvertObjectToMap(SampleComments)
  );
  const suggestedUsersArr = ConvertObjectToMap(SuggestedUsers);

  const toggleLike = () => {
    setLikedpost((prevState) => !prevState);
  };

  const toggleComment = () => {
    setCommentPopup((prevState) => !prevState);
  };

  const toggleShare = () => {
    setSharePopup((prevState) => !prevState);
  };

  const setNewComment = (value) => {
    newComment = value;
  };

  const updateComment = () => {
    const newCommentMap = new Map();
    newCommentMap.set(
      "profileImage",
      "https://cdn-icons-png.flaticon.com/512/4139/4139981.png"
    );
    newCommentMap.set("userName", "NewUser");
    newCommentMap.set("comment", newComment);
    newCommentMap.set("commentedTime", "just now");
    newCommentMap.set("likesForComment", "0");
    setCommentsArr((prevState) => [newCommentMap, ...prevState]);
  };

  const HeaderContainer = (
    <div className="feedHeader feedComponentwithPadding">
      <img className="profileImage clickable" src={man} alt="profile" />
      <p className="profileName clickable">{feed.get("username")}</p>
      <img className="settingsIcon clickable" src={settings} alt="profile" />
    </div>
  );

  const ActionsIconContainer = (
    <div className="actionsIconContainer feedComponentwithPadding">
      <img
        className="likeImage actionIcon clickable"
        onClick={() => toggleLike()}
        src={likedPost ? liked : notLiked}
        alt="like"
      />
      <img
        className="commentImage actionIcon clickable"
        onClick={() => toggleComment()}
        src={comment}
        alt="comment"
      />
      <img
        className="shareImage actionIcon clickable"
        onClick={() => toggleShare()}
        src={share}
        alt="share"
      />
      <img className="saveImage actionIcon clickable" src={save} alt="save" />
    </div>
  );

  const LikeCount = (
    <div className="likes clickable feedComponentwithPadding">
      {likedPost ? parseInt(feed.get("likes")) + 1 : feed.get("likes")} likes
    </div>
  );

  const DaysCount = (
    <div className="numberOfDays clickable feedComponentwithPadding">
      {feed.get("timeSincePosted")}
    </div>
  );

  const CommentingContainer = (
    <div className="commentingContainer feedComponentwithPadding">
      <img className="selectEmoji clickable" src={emoji} alt="emoji" />
      <input
        className="commentInput clickable"
        placeholder="Add a comment..."
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button className="postButton clickable" onClick={() => updateComment()}>
        Post
      </button>
    </div>
  );

  const DescriptionContainer = (
    <div className="descriptionContainer feedComponentwithPadding">
      <p className="profileName clickable">{feed.get("username")}</p>
      <p className="postDescription clickable">{feed.get("description")}</p>
    </div>
  );

  function ActionsContainer() {
    return (
      <div className="actionsContainer">
        {ActionsIconContainer}
        {LikeCount}
        {DescriptionContainer}
        <div className="numberOfComments clickable feedComponentwithPadding">
          View all {feed.get("comments")} comments
        </div>
        {DaysCount}
        {CommentingContainer}
      </div>
    );
  }

  function Comment({ comment }) {
    return (
      <div className="commentPopup-commentContainer">
        <div className="commentPopup-comment-profileImageContainer">
          <img
            className="commentPopup-comment-profileImage"
            src={comment.get("profileImage")}
            alt="profile"
          />
        </div>
        <div className="commentPopup-commentDisplay">
          <div className="commentPopup-comment">
            <p className="commentPopup-commentorName spanText">
              {comment.get("userName")}
            </p>
            <p className="commentPopup-actualComment spanText">
              {comment.get("comment")}
            </p>
          </div>
          <div className="commentPopup-comment-numericData">
            <p className="commentedTime spanText">
              {comment.get("commentedTime")}
            </p>
            <p className="likesForComment spanText">
              {comment.get("likesForComment")} likes
            </p>
            <p className="replyButton spanText">Reply</p>
            <img className="settingsIcon" src={settings} alt="settings" />
          </div>
        </div>
      </div>
    );
  }

  function SuggestedUser({ suggestedUser }) {
    const [buttonActive, setButtonActive] = useState(false);

    const toggleButton = () => {
      setButtonActive((prevState) => !prevState);
    };

    return (
      <div className="suggestedUser paddingLeft">
        <div className="suggestedUserProfileImageContainer">
          <img
            className="suggestedUserProfileImage"
            src={suggestedUser.get("profileImage")}
            alt="profile"
          />
        </div>
        <div className="suggestedUserDetailsContainer">
          <p className="suggestedUserProfileName spanText">
            {suggestedUser.get("userName")}
          </p>
          <p className="suggestedUserFullname spanText">
            {suggestedUser.get("fullName")}
          </p>
        </div>

        <img
          className="suggestedUserSelectButton"
          src={buttonActive ? radioButtonSelected : radioButton}
          onClick={() => toggleButton()}
          alt="select"
        />
      </div>
    );
  }

  return (
    <div className="feed">
      {HeaderContainer}
      <div className="imageContainer ">
        <img className="image" src={feed.get("image")} alt="dog" />
      </div>
      <ActionsContainer />
      <Dialog
        open={commentPopup}
        maxWidth="md"
        maxHeight="sm"
        onBackdropClick={() => toggleComment()}
      >
        <DialogContent
          sx={{
            padding: "0px",
          }}
        >
          <div className="commentPopup">
            <div className="commentPopup-imageContainer">
              <img
                className="commentPopup-image"
                src={feed.get("image")}
                alt="dog"
              />
            </div>
            <div className="commentPopup-actionsContainer">
              {HeaderContainer}
              <div className="commentPopup-availableComments">
                <div className="commentPopup-postDescriptionContainer">
                  <div>
                    <img
                      className="profileImage clickable"
                      src={man}
                      alt="profile"
                    />
                  </div>
                  <div className="commentPopup-postDescription">
                    {DescriptionContainer}
                    {DaysCount}
                  </div>
                </div>
                {commentsArr.map((comment) => (
                  <Comment comment={comment} key={comment.get("userName")} />
                ))}
              </div>
              {ActionsIconContainer}
              {LikeCount}
              {DaysCount}
              {CommentingContainer}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        className="shareDialogContainer"
        open={sharePopup}
        maxWidth="xs"
        maxHeight="xs"
        onBackdropClick={() => toggleShare()}
      >
        <DialogContent
          sx={{
            padding: "0px",
          }}
        >
          <div className="sharePopup">
            <div className="shareTitleContainer borderBottom">
              <p className="shareTitle">Share</p>
              <img
                className="sharePopup-closeIcon"
                src={close}
                alt="close"
                onClick={() => toggleShare()}
              />
            </div>
            <div className="selectedReceiversContainer borderBottom paddingLeft">
              <p className="toTitle">To:</p>
              <input className="selectedReceivers" placeholder="Search..." />
            </div>
            <div className="suggestionsContainer borderBottom">
              <p className="suggestedTitle paddingLeft">Suggested</p>
              <div className="suggestedUsersContainer">
                {suggestedUsersArr.map((suggestedUser) => (
                  <SuggestedUser
                    suggestedUser={suggestedUser}
                    key={suggestedUser.get("userName")}
                  />
                ))}
              </div>
            </div>
            <div className="shareSendButtonContainer">
              <button className="shareSendButton">Send</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

Feed.propTypes = {
  feed: PropTypes.Map.ActionsContainer,
  comment: PropTypes.Map.ActionsContainer,
  suggestedUser: PropTypes.Map.ActionsContainer,
};

export default Feed;
