import { useState } from "react";
import { man,liked,notLiked,comment,share,save,emoji,settings } from "../../assets/index";
import "./feed.css"; 

const Feed = ({feed}) => {

  const [likedPost, setLikedpost] = useState(false);

  const toggleLike = () => {
    console.log(likedPost);
    setLikedpost(prevState => !prevState);
  } 

    return (
        <div className="feed">
         <div className="feedHeader feedComponentwithPadding">
           <img className="profileImage clickable" src={man} alt="profile"/>
           <p className="profileName clickable">{feed.username}</p>
           <img className="settingsIcon clickable" src={settings} alt="profile"/>
         </div>
         <div className="contentContainer">
           <img className="media" src={feed.imageurl} alt="dog"/>
         </div>
         <div className="viewersContainer feedComponentwithPadding">
            <img className={"likeImage viewersIcon clickable "}
            onClick={() => toggleLike()}
            src={likedPost ? liked : notLiked } alt="like"/>
            <img className="commentImage viewersIcon clickable" src={comment} alt="comment"/>
            <img className="shareImage viewersIcon clickable" src={share} alt="share"/>
            <img className="saveImage viewersIcon clickable" src={save} alt="save"/>
            
         </div>
         <div className="likes clickable feedComponentwithPadding">
            {feed.likes} likes
         </div>
         <div className="descriptionContainer feedComponentwithPadding">
             <p className="profileName clickable">{feed.username}</p>
             <p className="postDescription clickable">{feed.description}</p>
         </div>
         <div className="numberOfComments clickable feedComponentwithPadding">
           View all {feed.comments} comments
         </div>
         <div className="numberOfDays clickable feedComponentwithPadding">
           {feed.likes} DAYS AGO
         </div>
         <div className="commentingContainer feedComponentwithPadding">
             <img className="selectEmoji clickable" src={emoji} alt="emoji"/>
             <input className="commentInput clickable" placeholder="Add a comment..."/>
             <button className="postButton clickable">Post</button>
         </div>
        </div>
    )
}

export default Feed;