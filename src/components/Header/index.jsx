import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

import "./index.css";

const Header = () => {
  const navigate = useNavigate();

  const handleSignOutClick = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      sessionStorage.removeItem("authToken");
      navigate("/auth");
    });
  };

  return (
    <header className="header">
      <nav className="header-nav">
        <NavLink to="/new-post" className="header-nav__link">New post</NavLink>
        <NavLink to="/blog" className="header-nav__link">Blog</NavLink>
      </nav>
      <button className="header__logout" type="button" onClick={handleSignOutClick}>
        Sign out
      </button>
    </header>
  );
};

export default Header;