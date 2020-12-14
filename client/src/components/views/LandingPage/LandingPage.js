import React, { useEffect } from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom";

const LandingPage = (props) => {
  const onClickHandler = () => {
    Axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        props.history.push("/login");
      } else {
        alert("로그아웃하는 데 실패했습니다.");
      }
    });
  };
  return (
    <div>
      <h2>메인페이지</h2>
      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
};

export default withRouter(LandingPage);
