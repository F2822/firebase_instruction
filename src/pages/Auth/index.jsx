import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

import "./index.css";

const Auth = () => {
  const [hasAccount, setHasAccount] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    const auth = getAuth();
    if (hasAccount) {
      signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
          const authToken = response._tokenResponse.refreshToken;
          sessionStorage.setItem("authToken", authToken);
          navigate("/blog");
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((response) => {
          const authToken = response._tokenResponse.refreshToken;
          sessionStorage.setItem("authToken", authToken);
          navigate("/blog");
        });
    }
  };

  return (
    <div className="auth-block">
      <h1 className="auth-block__title">
        {hasAccount ? "Sign In" : "Sign Up"}
      </h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="email-input">Email</label>
        <input id="email-input" type="email" name="email" />
        <label htmlFor="password-input">Password</label>
        <input id="password-input" type="password" name="password" />
        <button className="auth-form__send-button" type="submit">Send</button>
      </form>
      <a className="auth-block__register-toggle" onClick={() => setHasAccount(!hasAccount)}>
        {hasAccount ? "Sign Up" : "Sign In"}
      </a>
    </div>
  );
};

export default Auth;