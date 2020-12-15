import React from "react";
import { withRouter } from "react-router-dom";
import Header from "../Header/Header";

const LandingPage = (props) => {
  return (
    <>
      <Header />
      <main></main>
    </>
  );
};

export default withRouter(LandingPage);
