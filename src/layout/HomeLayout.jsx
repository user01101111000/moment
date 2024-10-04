import { Outlet, useNavigate, NavLink, useLocation } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
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
import useGetUserInfoMutation from "../hooks/api/useGetUserInfoMutation";
import isTokenExpired from "../utils/isTokenExpired ";
import { decryptToken } from "../utils/cryptoID";

const HomeLayout = () => {
  const navigate = useNavigate();
  const [add, setAdd] = useState(false);
  const { logout } = useAuth();
  const { mutateAsync } = useAddPostMutation();

  const { mutateAsync: getUserInfo } = useGetUserInfoMutation();

  const valid = isTokenExpired(
    decryptToken(JSON.parse(localStorage.getItem("m_i&r")).m_i)
  );

  useEffect(() => {
    getUserInfo();
  }, [valid]);

  async function callback(values) {
    await mutateAsync(values);
  }

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

            <NavLink to={`/@}`} className="nav_button">
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
