import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";
import { palette, viewportSize } from "../../styles/Theme";

function AddComment(props) {
  const { refreshComment, postId, responseTo, refreshReplyComment } = props;
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [newResponseTo, setNewResponseTo] = useState([]);
  const submitBtnRef = useRef();
  const textareaRef = useRef();

  useEffect(() => {
    if (responseTo) {
      setNewResponseTo(responseTo);
      textareaRef.current.focus();
    }

    submitBtnRef.current.disabled = true;
    if (comment !== "") {
      submitBtnRef.current.disabled = false;
    }
  }, [comment, responseTo]);

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
      postId: postId,
      responseTo: newResponseTo.commentId
    };
    Axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        const variable = { postId: postId };
        refreshComment(variable);
        setComment("");
        if (responseTo) {
          refreshReplyComment(null);
          setNewResponseTo([]);
        }
      } else {
        alert("댓글을 추가하는 데 실패했습니다.");
      }
    });
  };
  return (
    <CommentFormSection detailPage={props.detailPage}>
      <form onSubmit={onSubmit}>
        {responseTo && responseTo.length !== 0 && (
          <span>
            {`@${responseTo.nickname}`}
            <button
              className="delete-btn"
              onClick={() => refreshReplyComment(null)}
            >
              <AiFillCloseCircle />
            </button>
          </span>
        )}
        <textarea
          placeholder="댓글 달기..."
          onChange={onChangeHandler}
          value={comment}
          ref={textareaRef}
        />
        <button type="submit" ref={submitBtnRef}>
          게시
        </button>
      </form>
    </CommentFormSection>
  );
}

export default AddComment;

const CommentFormSection = styled.section`
  margin-top: 10px;
  padding: 0 12px;
  min-height: 56px;
  display: flex;
  align-items: center;
  border-top: 1px solid ${palette.borderColor};
  ${(props) =>
    props.detailPage &&
    css`
      border-top: 1px solid #efefef;
    `}
  @media ${viewportSize.tablet} {
    display: none;
  }
  form {
    width: 100%;
    display: flex;
    align-items: center;
    span {
      margin-right: 5px;
      display: flex;
      color: gray;
      .delete-btn {
        margin-left: 5px;
        padding: 0;
        background-color: transparent;
        color: gray;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
      }
    }
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
      &:disabled {
        opacity: 0.3;
        cursor: default;
        pointer-events: none;
      }
    }
  }
`;
