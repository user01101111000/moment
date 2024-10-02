import "./Skeleton.css";

const Skeleton = ({
  width = "100%",
  height = "100%",
  borderRadius = "0px",
  gridArea = "auto",
  backgroundColor = "rgba(255, 255, 255, 0.3)",
}) => {
  return (
    <div
      className="skeleton"
      style={{ width, height, borderRadius, gridArea, backgroundColor }}
    ></div>
  );
};

export default Skeleton;
