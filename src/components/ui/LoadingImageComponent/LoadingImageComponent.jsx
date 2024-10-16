import loading from "../../../assets/images/loading.gif";

const LoadingImageComponent = ({ size }) => {
  return (
    <figure style={{ width: size, height: size }}>
      <img
        style={{
          width: "100%",
          height: "100%",
        }}
        src={loading}
        alt="loading"
      />
    </figure>
  );
};

export default LoadingImageComponent;
