import React from "react";
import Header from "../Header";

import "./index.css";

const Layout = (props) => (
  <div className="layout">
    <Header />
    <main>
      {props.children}
    </main>
  </div>
);

export default Layout;