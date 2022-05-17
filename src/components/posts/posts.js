import React from "react";
import PropTypes from "prop-types";
import "./posts.css";
import SamplePosts from "../../services/samplePosts";

function Posts() {
  const posts = SamplePosts;

  return (
    <div className="posts">
      <p className="postTitle">Posts</p>
      <div className="postContent">
        {posts.map((post) => (
          <div className="postImageWrapper" key={post.id}>
            <img className="postImage clickable" src={post} alt="animals" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
