import Axios from "axios";
import React, { useEffect, useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";

function LikeBtn(props) {
  const { postId, commentId, refreshLike } = props;
  const [likes, setLikes] = useState(0);
  const [likeAction, setLikeAction] = useState(false);

  const userId = localStorage.getItem("ls");

  let likeVariable;
  if (postId) {
    likeVariable = { postId: postId, userId: userId };
  } else {
    likeVariable = { commentId: commentId, userId: userId };
  }

  useEffect(() => {
    Axios.post("/api/like/getLikes", likeVariable).then((response) => {
      if (response.data.success) {
        setLikes(response.data.likes.length);
        // eslint-disable-next-line array-callback-return
        response.data.likes.map((like) => {
          if (like.userId === userId) {
            setLikeAction(true);
          }
        });
      } else {
        alert("좋아요 정보를 가져오는 데 실패했습니다.");
      }
    });
  }, [likeVariable, userId]);

  const onClickLike = () => {
    if (likeAction) {
      Axios.post("/api/like/unLike", likeVariable).then((response) => {
        if (response.data.success) {
          setLikeAction(false);
          if (refreshLike) {
            refreshLike(likes - 1);
          }
        } else {
          alert("좋아요를 취소하는 데 실패했습니다");
        }
      });
    } else {
      Axios.post("/api/like/plusLike", likeVariable).then((response) => {
        if (response.data.success) {
          setLikeAction(true);
          if (refreshLike) {
            refreshLike(likes + 1);
          }
        } else {
          alert("좋아요 하는 데 실패했습니다");
        }
      });
    }
  };
  return (
    <>
      {likeAction ? (
        <button onClick={onClickLike}>
          <BsHeartFill className="like-btn" fill="#ff1b3e" />
        </button>
      ) : (
        <button onClick={onClickLike}>
          <BsHeart className="like-btn" />
        </button>
      )}
    </>
  );
}

export default LikeBtn;
