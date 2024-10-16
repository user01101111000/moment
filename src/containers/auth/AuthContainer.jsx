import Login from "../../components/auth/Login/Login";
import Register from "../../components/auth/Register/Register";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContainer = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <section className="auth_container">
      <article className="auth_box">
        <AnimatePresence>
          {showLogin ? (
            <Login setShowLogin={setShowLogin} />
          ) : (
            <Register setShowLogin={setShowLogin} />
          )}
        </AnimatePresence>
      </article>

      <ToastContainer />
    </section>
  );
};

export default AuthContainer;
