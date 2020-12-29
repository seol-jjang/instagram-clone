import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";
import { BsChat } from "react-icons/bs";
import { VscBookmark } from "react-icons/vsc";
import { palette, ProfileIcon, UserNickname } from "../../../../styles/Theme";
import { Link } from "react-router-dom";
import CommentFactory from "./CommentFactory";
import ImageSlide from "../../../utils/ImageSlide";
import LikeBtn from "../../../utils/LikeBtn";
import LikeNumber from "./LikeNumber";

function PostFactory() {
  const [posts, setPosts] = useState([]);
  const [likeNumber, setLikeNumber] = useState(0);

  useEffect(() => {
    Axios.get("/api/post/getPosts").then((response) => {
      if (response.data.success) {
        setPosts(response.data.posts);
      } else {
        alert("피드 불러오기를 실패했습니다");
      }
    });
  }, []);

  const refreshLike = (likeNumber) => {
    setLikeNumber(likeNumber);
  };

  return (
    <>
      {posts.map((post, index) => (
        <Article key={index}>
          <Writer>
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
          </Writer>
          <Picture>
            <ImageSlide images={post.filePath} />
          </Picture>
          <BtnUtil>
            <div>
              <LikeBtn postId={post._id} refreshLike={refreshLike} />
              <button>
                <Link to={`/p/${post._id}`}>
                  <BsChat />
                </Link>
              </button>
            </div>
            <div>
              <button>
                <VscBookmark />
              </button>
            </div>
          </BtnUtil>
          <Details>
            <PostContent>
              <Link to={`/user/${post.userFrom.nickname}`}>
                <UserNickname>{post.userFrom.nickname}</UserNickname>
              </Link>
              <Description>{post.description}</Description>
            </PostContent>
          </Details>
          <CommentFactory postId={post._id} />
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
`;

const Writer = styled.header`
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

const Picture = styled.div`
  position: relative;
  background-color: black;
  border-top: 1px solid ${palette.borderColor};
  border-bottom: 1px solid ${palette.borderColor};
`;

const Details = styled.div`
  background-color: white;
  padding: 5px 12px 8px;
`;

const LikeText = styled.p`
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: bold;
  color: ${palette.blackColor};
`;

const BtnUtil = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  padding-bottom: 0;
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

const PostContent = styled.span`
  line-height: 1.1;
  a:hover {
    text-decoration: underline;
  }
  .elle {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Description = styled.span`
  font-size: 14px;
  margin-left: 5px;
  white-space: pre-line;
`;
