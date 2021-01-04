import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";
import { BsChat } from "react-icons/bs";
import { VscBookmark } from "react-icons/vsc";
import {
  palette,
  ProfileIcon,
  UserNickname,
  viewportSize
} from "../../../../styles/Theme";
import { Link } from "react-router-dom";
import ImageSlide from "../../../utils/ImageSlide";
import LikeBtn from "../../../utils/LikeBtn";
import LikeNumber from "../../../utils/LikeNumber";
import DetailContent from "./DetailContent";
import AddComment from "../../../utils/AddComment";

function PostFactory() {
  const [posts, setPosts] = useState([]);
  const [refreshPostId, setRefreshPostId] = useState();
  const [likeNumber, setLikeNumber] = useState(0);

  useEffect(() => {
    let unmounted = false;
    let source = Axios.CancelToken.source();
    Axios.get("/api/post/getPosts", { cancelToken: source.token })
      .then((response) => {
        if (!unmounted) {
          if (response.data.success) {
            setPosts(response.data.posts);
          } else {
            alert("피드 불러오기를 실패했습니다");
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
  }, []);

  const refreshLike = (likeNumber) => {
    setLikeNumber(likeNumber);
  };

  const refreshComment = (variable) => {
    setRefreshPostId(variable);
  };

  return (
    <>
      {posts.map((post, index) => (
        <Article key={index}>
          <WriteHeader>
            <ProfileIcon size="medium">
              <Link to={`/user/${post.userFrom.nickname}`}>
                <img
                  src={`http://localhost:5000/${post.userFrom.profileImage}`}
                  alt={post.userFrom.nickname}
                />
              </Link>
            </ProfileIcon>
            <Link to={`/user/${post.userFrom.nickname}`}>
              <UserNickname>{post.userFrom.nickname}</UserNickname>
            </Link>
          </WriteHeader>
          <PictureWrap>
            <ImageSlide images={post.filePath} />
          </PictureWrap>
          <ContentsContainer>
            <BtnUtil>
              <div>
                <LikeBtn postId={post._id} refreshLike={refreshLike} />
                <button>
                  <Link to={`/p/${post._id}`}>
                    <BsChat />
                  </Link>
                </button>
              </div>
              <button>
                <VscBookmark />
              </button>
            </BtnUtil>
            <LikeNumber postId={post._id} newLikeNumber={likeNumber} />
            <DetailContent post={post} refreshPostId={refreshPostId} />
          </ContentsContainer>
          <AddComment postId={post._id} refreshComment={refreshComment} />
        </Article>
      ))}
    </>
  );
}

export default PostFactory;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  border: 1px solid ${palette.borderColor};
  background-color: white;
  margin-bottom: 60px;

  @media ${viewportSize.tablet} {
    border: 0;
    margin-bottom: 0;
    padding-bottom: 20px;
  }
`;

const WriteHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 13px 15px;
  a:hover {
    text-decoration: underline;
  }
  span {
    margin-right: 15px;
  }
`;

const PictureWrap = styled.div`
  position: relative;
  background-color: black;
  border-top: 1px solid ${palette.borderColor};
  border-bottom: 1px solid ${palette.borderColor};
`;

const ContentsContainer = styled.div``;

const BtnUtil = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  margin: 12px 0 5px;
  button {
    padding: 0;
    cursor: pointer;
    background-color: transparent;
    &:not(:first-child) {
      margin-left: 10px;
    }
    svg {
      width: 25px;
      height: 25px;
    }
    .like-btn {
      padding-top: 2px;
    }
    .like {
      fill: #ff1b3e;
    }
  }
`;
