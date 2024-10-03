import loa from "../../assets/images/loading.gif";

const Loading = ({ size }) => {
  return (
    <figure style={{ width: size, height: size }}>
      <img
        style={{
          width: "100%",
          height: "100%",
        }}
        src={loa}
        alt="loading"
      />
    </figure>
  );
};

export default Loading;
