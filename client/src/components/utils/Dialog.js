import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import { palette } from "../../styles/Theme";

function Dialog(props) {
  const { onClose, visible, postId, commentId, writer } = props;
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

  if (!animate && !visible) return null;
  return (
    <DarkBackground onClick={close} disappear={!visible}>
      <DialogBlock visible={visible}>
        <ul>
          {user.userData._id === writer && <li>삭제</li>}
          {postId && (
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

export default Dialog;

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
