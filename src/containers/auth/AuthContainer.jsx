import "./AuthContainer.css";
import Login from "../../components/auth/Login/Login";
import Register from "../../components/auth/Register/Register";
import { useState } from "react";

const AuthContainer = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <section className="auth_container">
      <article className="auth_box">
        {/* <h1 className="auth_title">MOMENT</h1> */}

        {showLogin ? <Login setShowLogin={setShowLogin} /> : <Register />}
      </article>
    </section>
  );
};

export default AuthContainer;
