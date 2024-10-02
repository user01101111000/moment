import PostList from "../PostList/PostList";
import { useNavigate } from "react-router-dom";
import "./Flow.css";

const Flow = ({ posts }) => {
  const navigate = useNavigate();

  return (
    <article className="flow">
      <h1 className="flow_title" onClick={() => navigate("/")}>
        MOMENT
      </h1>
      <PostList posts={posts} />
      <hr className="divider" />
      <p className="made_by">
        Made by{" "}
        <a href="https://github.com/user01101111000" target="_blank">
          user01101111000
        </a>
      </p>
    </article>
  );
};

export default Flow;
