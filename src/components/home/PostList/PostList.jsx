import Post from "../Post/Post";
import "./PostList.css";

const PostList = ({ posts = [] }) => {
  const postList = posts.map((post) => {
    return (
      <div key={post.id.stringValue} className="post_wrapper">
        <hr className="divider" />
        <Post post={post} />
      </div>
    );
  });

  return <div className="post_list">{postList}</div>;
};

export default PostList;
