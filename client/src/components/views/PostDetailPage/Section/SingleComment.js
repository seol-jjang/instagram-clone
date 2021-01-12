import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosMore } from "react-icons/io";
import { ProfileIcon, UserNickname } from "../../../../styles/Theme";
import styled from "styled-components";
import Axios from "axios";
import LikeBtn from "../../../utils/LikeBtn";
import Dialog from "../../../utils/Dialog";

function SingleComment(props) {
  const { comment, refreshReplyComment } = props;
  const [likeNumber, setLikeNumber] = useState(0);
  const [visible, setVisible] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [writer, setWriter] = useState("");
  const [btnHover, setBtnHover] = useState(false);

  useEffect(() => {
    let unmounted = false;
    let source = Axios.CancelToken.source();
    const likeVariable = {
      commentId: comment._id
    };
    Axios.post("/api/like/getLikes", likeVariable, {
      cancelToken: source.token
    })
      .then((response) => {
        if (!unmounted) {
          if (response.data.success) {
            setLikeNumber(response.data.likes.length);
          } else {
            alert("좋아요 정보를 가져오는 데 실패했습니다.");
          }
        }
      })
      .catch(function (e) {
        if (!unmounted) {
          if (Axios.isCancel(e)) {
            console.log("요청 취소: ", e.message);
          } else {
            console.log("오류 발생 ", e.message);
          }
        }
      });
    return function () {
      unmounted = true;
      source.cancel("Canceling in cleanup");
    };
  }, [comment._id]);

  const refreshLike = (likeNumber) => {
    setLikeNumber(likeNumber);
  };

  const onClickMore = (commentId = "", userFrom = "") => {
    setVisible(!visible);
    setCommentId(commentId);
    setWriter(userFrom);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <CommentContainer
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
      >
        {comment.userFrom && (
          <>
            <Writer>
              <ProfileIcon size="medium" className="profile-image">
                <Link to={`/user/${comment.userFrom.nickname}`}>
                  <img
                    src={`http://localhost:5000/${comment.userFrom.profileImage}`}
                    alt={comment.userFrom.nickname}
                  />
                </Link>
              </ProfileIcon>
              <ContentWrap>
                <div>
                  <Link to={`/${comment.userFrom.nickname}`}>
                    <UserNickname>{comment.userFrom.nickname}</UserNickname>
                  </Link>
                  <span className="comment">{comment.content}</span>
                </div>
                <div>
                  {likeNumber > 0 && <button>좋아요 {likeNumber}개</button>}
                  <button
                    onClick={() =>
                      refreshReplyComment(
                        comment.userFrom.nickname,
                        comment._id
                      )
                    }
                  >
                    답글 달기
                  </button>
                </div>
              </ContentWrap>
            </Writer>
            <BtnUtil>
              {btnHover && (
                <MoreBtn
                  onClick={() => onClickMore(comment._id, comment.userFrom._id)}
                >
                  <IoIosMore />
                </MoreBtn>
              )}

              <LikeBtn commentId={comment._id} refreshLike={refreshLike} />
            </BtnUtil>
          </>
        )}
      </CommentContainer>
      <Dialog
        onClose={onClose}
        visible={visible}
        commentId={commentId}
        writer={writer}
      />
    </>
  );
}

export default SingleComment;

const CommentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  a:hover {
    text-decoration: underline;
  }
  .comment {
    font-size: 14px;
    margin-left: 5px;
  }
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  div:last-child {
    display: flex;
    button {
      color: gray;
      font-weight: bold;
      margin-top: 5px;
      margin-right: 10px;
    }
  }
`;
const Writer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  .profile-image {
    margin-right: 15px;
  }
  .description {
    margin-left: 10px;
  }
`;

const BtnUtil = styled.div`
  display: flex;
  align-items: center;
`;

const MoreBtn = styled.button`
  opacity: 0.7;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 10px;
  padding: 0;
  background-color: transparent;
  svg {
    width: 20px;
    height: 20px;
  }
`;
