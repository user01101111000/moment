import Loading from "../../ui/Loading";
import Post from "../Post/Post";
import "./PostList.css";

const PostList = ({ posts = [], refProp, isFetchingNextPage }) => {
  const postList = posts.map((post, _) =>
    _ == posts.length - 1 ? (
      <div key={post.id.stringValue} className="post_wrapper" ref={refProp}>
        <Post post={post} />

        {isFetchingNextPage && (
          <div className="infinitie_loading_area">
            <Loading size={"1rem"} />
          </div>
        )}
      </div>
    ) : (
      <div key={post.id.stringValue} className="post_wrapper">
        <Post post={post} />

        <hr className="divider" />
      </div>
    )
  );

  return <div className="post_list">{postList}</div>;
};

export default PostList;
