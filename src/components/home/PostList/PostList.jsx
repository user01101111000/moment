import Loading from "../../ui/Loading";
import Post from "../Post/Post";
import "./PostList.css";

const PostList = ({ posts = [], refProp, isFetchingNextPage }) => {
  const postList = posts.map((post, _) => {
    if (_ == posts.length - 1) {
      return (
        <div key={post.id.stringValue} className="post_wrapper" ref={refProp}>
          <Post post={post} />

          <hr className="divider" />

          {isFetchingNextPage && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                padding: "1rem",
              }}
            >
              <Loading size={"1rem"} />
            </div>
          )}
        </div>
      );
    } else
      return (
        <div key={post.id.stringValue} className="post_wrapper">
          <Post post={post} />

          <hr className="divider" />
        </div>
      );
  });

  return <div className="post_list">{postList}</div>;
};

export default PostList;
