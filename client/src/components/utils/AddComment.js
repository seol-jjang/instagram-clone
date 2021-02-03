import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useSelector } from "react-redux";
import { AiFillCloseCircle, AiOutlineLoading } from "react-icons/ai";
import { palette, viewportSize } from "../../styles/Theme";

function AddComment(props) {
  const { addComment, postId, responseTo, addReplyComment } = props;
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [loading, setLoading] = useState(null);
  const textareaRef = useRef();

  useEffect(() => {
    if (responseTo) {
      textareaRef.current.focus();
    }

    if (comment !== "") {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [comment, responseTo]);

  const onChangeHandler = (event) => {
    setComment(event.target.value);
    event.target.style.height = "18px";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    let variables;
    if (responseTo) {
      variables = {
        content: comment,
        userFrom: user.userData._id,
        postId: postId,
        responseTo: responseTo.commentId
      };
    } else {
      variables = {
        content: comment,
        userFrom: user.userData._id,
        postId: postId
      };
    }

    Axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        addComment(response.data.result);
        setComment("");
        setLoading(false);
        if (responseTo) {
          addReplyComment(null);
        }
      } else {
        alert("댓글을 추가하는 데 실패했습니다.");
      }
    });
  };
  return (
    <AddCommentContainer>
      {loading && (
        <Loading>
          <span>
            <AiOutlineLoading />
          </span>
        </Loading>
      )}
      <CommentFormSection detailPage={props.detailPage}>
        <form onSubmit={onSubmit}>
          {responseTo && responseTo.length !== 0 && (
            <span>
              {`@${responseTo.nickname}`}
              <button
                className="delete-btn"
                onClick={() => addReplyComment(null)}
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
          <button type="submit" disabled={btnDisabled}>
            게시
          </button>
        </form>
      </CommentFormSection>
    </AddCommentContainer>
  );
}

export default AddComment;

const AddCommentContainer = styled.section`
  position: relative;
`;

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

const Rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg)
  }
`;

const Loading = styled.div`
  position: absolute;
  top: 10px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.6);
  span {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      animation: ${Rotation} 1s linear infinite;
    }
  }
`;
