import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { BsChat } from "react-icons/bs";
import { VscBookmark } from "react-icons/vsc";
import {
  Inner,
  palette,
  ProfileIcon,
  UserNickname
} from "../../../styles/Theme";
import ImageSlide from "../../utils/ImageSlide";
import AddComment from "../../utils/AddComment";
import ReplyComment from "./Section/ReplyComment";
import SingleComment from "./Section/SingleComment";
import LikeBtn from "../../utils/LikeBtn";
import CommentFactory from "./Section/CommentFactory";
import LikeNumber from "../../utils/LikeNumber";

function PostDetailPage(props) {
  const params = useParams();
  const [post, setPost] = useState([]);
  const [newPostId, setNewPostId] = useState();
  const [responseTo, setResponseTo] = useState([]);
  const [likeNumber, setLikeNumber] = useState(0);

  useEffect(() => {
    Axios.post("/api/post/getPostDetail", params).then((response) => {
      if (response.data.success) {
        setPost(response.data.post);
      } else {
        alert("게시글을 불러오는 데 실패했습니다.");
      }
    });
  }, [params]);

  const refreshLike = (likeNumber) => {
    setLikeNumber(likeNumber);
  };

  const onReplyComment = (nickname, commentId) => {
    if (nickname !== null) {
      setResponseTo({
        nickname,
        commentId
      });
    } else {
      setResponseTo([]);
    }
  };

  const refreshComment = (variable) => {
    setNewPostId(variable);
  };

  return (
    <Inner>
      {post.userFrom && (
        <Article>
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
            <LikeNumber
              postId={post._id}
              newLikeNumber={likeNumber}
              detailPage
            />
            <AddComment
              postId={post._id}
              refreshReplyComment={onReplyComment}
              refreshComment={refreshComment}
              responseTo={responseTo}
              detailPage
            />
            <ScrollContainer>
              <DetailContent>
                <ProfileIcon size="medium" className="profile-image">
                  <Link to={`/user/${post.userFrom.nickname}`}>
                    <img
                      src={`http://localhost:5000/${post.userFrom.profileImage}`}
                      alt={post.userFrom.nickname}
                    />
                  </Link>
                </ProfileIcon>
                <div>
                  <Link to={`/user/${post.userFrom.nickname}`}>
                    <UserNickname>{post.userFrom.nickname}</UserNickname>
                  </Link>
                  <Description className="description">
                    {post.description}
                  </Description>
                </div>
              </DetailContent>
              <CommentFactory
                postId={post._id}
                refreshReplyComment={onReplyComment}
                newPostId={newPostId}
              />
            </ScrollContainer>
          </ContentsContainer>
        </Article>
      )}
    </Inner>
  );
}

export default PostDetailPage;

const Article = styled.article`
  position: relative;
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${palette.borderColor};
  background-color: white;
`;

const WriteHeader = styled.header`
  position: absolute;
  right: 0;
  width: 320px;
  height: 72px;
  padding: 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #efefef;
  a:hover {
    text-decoration: underline;
  }
  span {
    margin-right: 15px;
  }
`;

const PictureWrap = styled.div`
  max-width: 614px;
  min-height: 450px;
  width: 100%;
  background-color: black;
  border-right: 1px solid ${palette.borderColor};
`;

const ContentsContainer = styled.div`
  position: absolute;
  top: 72px;
  right: 0;
  bottom: 0;
  width: 320px;
  display: flex;
  flex-direction: column;
  & > section {
    order: 1;
  }
`;

const ScrollContainer = styled.ul`
  padding: 16px;
  height: calc(100% - 87px);
  overflow-y: scroll;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const DetailContent = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 20px;
  .profile-image {
    margin-right: 15px;
  }
  .description {
    margin-left: 10px;
  }
`;

const Description = styled.span`
  font-size: 14px;
  white-space: pre-line;
`;

const BtnUtil = styled.section`
  padding: 10px 16px 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #efefef;
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
const LikeText = styled.p`
  order: 1;
  padding: 5px 15px;
  font-size: 14px;
  font-weight: bold;
  color: ${palette.blackColor};
`;
