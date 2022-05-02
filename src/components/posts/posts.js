import "./posts.css";
import SamplePosts from "../../services/samplePosts";

const Posts = () => {
  const posts = SamplePosts;
  console.log(posts);

  return (
    <div className="posts">
      <p className="postTitle">Posts</p>
      <div className="postContent">
        {posts.map((post) => {
          return (
            <div className="postImageWrapper">
              <img className="postImage clickable" src={post} alt="animals" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
