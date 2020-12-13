import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_action";

const LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailMessage, setLoginFailMessage] = useState("");
  const dispatch = useDispatch();

  const onChangeHandler = (event) => {
    const {
      target: { value, name }
    } = event;

    if (name === "emailInput") {
      setEmail(value);
    } else if (name === "passwordInput") {
      setPassword(value);
    }
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    let body = {
      email,
      password
    };
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        props.history.push("/");
      } else {
        setLoginFailMessage(response.payload.message);
      }
    });
  };

  return (
    <div style={{ width: "500px" }}>
      <form
        onSubmit={onSubmitHandler}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          type="email"
          id="emailInput"
          name="emailInput"
          placeholder="이메일"
          value={email}
          onChange={onChangeHandler}
        />
        <input
          type="password"
          id="passwordInput"
          name="passwordInput"
          placeholder="비밀번호"
          value={password}
          onChange={onChangeHandler}
        />
        <button type="submit">로그인</button>
      </form>
      {loginFailMessage && (
        <p style={{ color: "red", fontSize: "14px" }}>{loginFailMessage}</p>
      )}
    </div>
  );
};

export default withRouter(LoginPage);
