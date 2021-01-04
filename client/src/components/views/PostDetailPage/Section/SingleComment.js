import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProfileIcon, UserNickname } from "../../../../styles/Theme";
import styled from "styled-components";
import Axios from "axios";
import LikeBtn from "../../../utils/LikeBtn";

function SingleComment(props) {
  const { comment, refreshReplyComment } = props;
  const [likeNumber, setLikeNumber] = useState(0);

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

  return (
    <div>
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
                    refreshReplyComment(comment.userFrom.nickname, comment._id)
                  }
                >
                  답글 달기
                </button>
              </div>
            </ContentWrap>
          </Writer>
          <LikeBtn commentId={comment._id} refreshLike={refreshLike} />
        </>
      )}
    </div>
  );
}

export default SingleComment;

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
