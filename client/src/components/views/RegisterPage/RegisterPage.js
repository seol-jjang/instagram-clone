import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../../_actions/user_action";

const RegisterPage = (props) => {
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const emailRegExp = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;

  const onSubmit = (data) => {
    const body = {
      email: data.emailInput,
      name: data.nameInput,
      nickname: data.nicknameInput,
      password: data.passwordInput
    };
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push("/");
      } else {
        alert(response.payload.message);
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          name="emailInput"
          ref={register({ required: true, pattern: emailRegExp })}
          placeholder="이메일"
        />
        {errors.emailInput && errors.emailInput.type === "required" && (
          <p>이메일을 입력해주세요</p>
        )}
        {errors.emailInput && errors.emailInput.type === "pattern" && (
          <p>유효하지 않은 이메일형식입니다.</p>
        )}
        <input type="text" name="nameInput" ref={register} placeholder="성명" />
        <input
          type="text"
          name="nicknameInput"
          ref={register({ required: true, maxLength: 30 })}
          placeholder="사용자 이름"
        />
        {errors.nicknameInput && errors.nicknameInput.type === "required" && (
          <p>사용자이름을 입력해주세요</p>
        )}
        <input
          type="password"
          name="passwordInput"
          ref={register({ required: true, minLength: 6 })}
          placeholder="비밀번호"
        />
        {errors.passwordInput && errors.passwordInput.type === "required" && (
          <p>유효하지 않은 비밀번호입니다.</p>
        )}
        {errors.passwordInput && errors.passwordInput.type === "minLength" && (
          <p>비밀번호는 최소 6자 이상이어야 합니다.</p>
        )}
        <button type="submit">가입</button>
      </form>
    </div>
  );
};

export default withRouter(RegisterPage);
