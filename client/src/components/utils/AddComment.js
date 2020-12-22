import Axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { palette } from "../../styles/Theme";

function AddComment(props) {
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.user);

  const onChangeHandler = (event) => {
    setComment(event.target.value);
    event.target.style.height = "18px";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };
  const onSubmit = (event) => {
    event.preventDefault();

    const variables = {
      content: comment,
      userFrom: user.userData._id,
      postId: props.postId
    };
    Axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
      } else {
        alert("댓글을 추가하는 데 실패했습니다.");
      }
    });
  };
  return (
    <Comment>
      <div>
        <form onSubmit={onSubmit}>
          <textarea
            placeholder="댓글 달기..."
            onChange={onChangeHandler}
            value={comment}
          />
          <button type="submit">게시</button>
        </form>
      </div>
    </Comment>
  );
}

export default AddComment;

const Comment = styled.div`
  display: flex;
  align-items: center;
  min-height: 56px;
  border-top: 1px solid ${palette.borderColor};
  & > div {
    width: 100%;
    padding: 5px 15px;
  }
  form {
    display: flex;
    align-items: center;
    textarea {
      height: 18px;
      max-height: 80px;
      padding: 0;
      flex-grow: 1;
      border: none;
      outline: none;
      resize: none;
      background-color: transparent;
    }
    button {
      padding: 0;
      background-color: transparent;
      color: ${palette.ActivatedColor};
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
    }
  }
`;