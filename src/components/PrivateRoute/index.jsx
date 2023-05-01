import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = (props) => {
  let navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem("authToken");

    if (!!authToken) {
      return;
    }

    navigate("/auth");
  }, []);

  return props.children;
};

export default PrivateRoute;