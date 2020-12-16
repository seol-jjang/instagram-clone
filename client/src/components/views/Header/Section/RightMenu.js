import React from "react";
import Axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector((state) => state.user);
  const onClickLogout = () => {
    Axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        props.history.push("/");
      } else {
        alert("로그아웃하는 데 실패했습니다.");
      }
    });
  };
  if (user.userData && !user.userData.isAuth) {
    return (
      <div>
        <Link to="/accounts">
          <button>회원가입</button>
        </Link>
        <Link to="/login">
          <button>로그인</button>
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <Link to="/post/upload">
          <button>글쓰기</button>
        </Link>
        <button onClick={onClickLogout}>로그아웃</button>
      </div>
    );
  }
}

export default withRouter(RightMenu);
