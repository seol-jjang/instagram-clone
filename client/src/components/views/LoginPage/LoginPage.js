import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "../../../_actions/user_action";

const LoginPage = (props) => {
  const { register, errors, handleSubmit } = useForm();
  const [loginFailMessage, setLoginFailMessage] = useState();
  const dispatch = useDispatch();

  const onSubmitHandler = (data) => {
    const body = {
      email: data.emailInput,
      password: data.passwordInput
    };
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        localStorage.setItem("ls", response.payload.userId);
        props.history.push(`/main`);
      } else {
        setLoginFailMessage(response.payload.message);
      }
    });
  };

  return (
    <div style={{ width: "500px" }}>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          type="email"
          id="emailInput"
          name="emailInput"
          placeholder="이메일"
          ref={register({ required: true })}
        />
        {errors.emailInput && errors.emailInput.type === "required" && (
          <p style={{ color: "red", fontSize: "14px" }}>
            이메일을 입력해주세요
          </p>
        )}
        <input
          type="password"
          name="passwordInput"
          ref={register({ required: true })}
          placeholder="비밀번호"
        />
        {errors.passwordInput && errors.passwordInput.type === "required" && (
          <p style={{ color: "red", fontSize: "14px" }}>
            비밀번호를 입력해주세요
          </p>
        )}
        <button type="submit">로그인</button>
      </form>
      {loginFailMessage && (
        <p style={{ color: "red", fontSize: "14px" }}>{loginFailMessage}</p>
      )}
      <Link to="/accounts" replace>
        <button>회원가입</button>
      </Link>
    </div>
  );
};

export default withRouter(LoginPage);
