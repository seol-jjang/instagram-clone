import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import { palette } from "../../styles/Theme";

function Dialog(props) {
  const {
    onClose,
    visible,
    postId,
    commentId,
    writer,
    detailPage,
    deleteComment
  } = props;
  const user = useSelector((state) => state.user);
  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(visible);

  useEffect(() => {
    if (localVisible && visible) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 100);
    }
    setLocalVisible(visible);
  }, [localVisible, visible]);

  const close = () => {
    onClose();
  };

  const onDelete = () => {
    let body;
    if (postId) {
      body = { postId };
      Axios.post("/api/post/removePost", body).then((response) => {
        if (response.data.success) {
          if (detailPage) {
            props.history.push("/");
          } else {
            window.location.reload();
          }
        } else {
          alert("게시글을 삭제하는 데 실패했습니다.");
        }
      });
    } else if (commentId) {
      body = { commentId };
      Axios.post("/api/comment/removeComment", body).then((response) => {
        if (response.data.success) {
          deleteComment(response.data.comment._id);
        } else {
          alert("댓글을 삭제하는 데 실패했습니다.");
        }
      });
    }
  };

  if (!animate && !visible) return null;
  return (
    <DarkBackground onClick={close} disappear={!visible}>
      <DialogBlock visible={visible}>
        <ul>
          {user.userData._id === writer && <li onClick={onDelete}>삭제</li>}
          {postId && !detailPage && (
            <li>
              <Link to={`/p/${postId}`}>게시물로 이동</Link>
            </li>
          )}
          <li onClick={close}>취소</li>
        </ul>
      </DialogBlock>
    </DarkBackground>
  );
}

export default withRouter(Dialog);

const appear = keyframes`
  from {
    transform: scale(1.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const DarkBackground = styled.div`
  z-index: 1;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
`;

const DialogBlock = styled.div`
  z-index: 2;
  width: 400px;
  background: white;
  border-radius: 10px;
  font-size: 14px;
  ${(props) =>
    !props.disappear &&
    css`
      animation: ${appear} 0.1s ease-out;
    `}

  ul {
    display: flex;
    flex-direction: column;
    li {
      cursor: pointer;
      display: flex;
      justify-content: center;
      width: 100%;
      padding: 15px;
      a {
        font-size: 14px;
      }
    }
    li:not(:last-child) {
      border-bottom: 1px solid ${palette.borderColor};
    }
  }
`;
