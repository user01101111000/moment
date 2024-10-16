import LoadingImageComponent from "../LoadingImageComponent/LoadingImageComponent";

const SimpleLoadingPage = () => {
  return (
    <section
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoadingImageComponent size={"1.2rem"} />
    </section>
  );
};

export default SimpleLoadingPage;
