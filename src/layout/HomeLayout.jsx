import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { Suspense, useState } from "react";
import "./HomeLayout.css";
import SuspenseLoading from "../components/helper/SuspenseLoading";
import useAuth from "../hooks/common/useAuth";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { AnimatePresence } from "framer-motion";
import { FaUserLarge } from "react-icons/fa6";
import { TiPlus } from "react-icons/ti";
import { HiHome } from "react-icons/hi2";
import useAddPostMutation from "../hooks/api/useAddPostMutation";
import AddPostWindow from "../components/home/AddPostWindow/AddPostWindow";

const HomeLayout = () => {
  const { logout } = useAuth();
  const { mutateAsync } = useAddPostMutation();

  async function callback(values) {
    await mutateAsync(values);
  }

  const navigate = useNavigate();
  const [add, setAdd] = useState(false);

  return (
    <main className="home-layout">
      <article className="flow">
        <Suspense fallback={<SuspenseLoading />}>
          <Outlet />
        </Suspense>
        <div className="navigation_bar">
          <div></div>
          <div className="nav_buttons">
            <NavLink to="/" className="nav_button">
              <HiHome className="nav_button_icon" />
            </NavLink>

            <div
              className="nav_button add_post_icon"
              onClick={() => setAdd((prev) => !prev)}
            >
              <TiPlus className="nav_button_icon" />
            </div>

            <NavLink to="/profile" className="nav_button">
              <FaUserLarge className="nav_button_icon" />
            </NavLink>
          </div>

          <div className="nav_button logout_nav_icon">
            <RiLogoutBoxRLine
              className="nav_button_icon"
              onClick={() => {
                localStorage.removeItem("m_i&r");
                logout();
                navigate("/auth");
              }}
            />
          </div>
        </div>
      </article>

      <AnimatePresence>
        {add && (
          <AddPostWindow
            setAdd={setAdd}
            callback={callback}
            username="Username"
            content="Content"
            buttonName="Post"
          />
        )}
      </AnimatePresence>
    </main>
  );
};

export default HomeLayout;
