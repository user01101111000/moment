import { Outlet } from "react-router-dom";
import "./HomeLayout.css";

const HomeLayout = () => {
  return (
    <main className="home-layout">
      <Outlet />
    </main>
  );
};

export default HomeLayout;
