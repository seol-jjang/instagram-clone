import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { BsHeart, BsHeartFill, BsChat } from "react-icons/bs";
import { VscBookmark } from "react-icons/vsc";
import { palette, ProfileIcon, UserNickname } from "../../../../styles/Theme";
import { Link } from "react-router-dom";
import AddComment from "../../../utils/AddComment";
import CommentFactory from "./CommentFactory";

function PostFactory() {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    Axios.get("/api/post/getPosts").then((response) => {
      if (response.data.success) {
        setPosts(response.data.posts);
      } else {
        alert("피드 불러오기를 실패했습니다");
      }
    });
  }, []);

  return (
    <>
      {posts.map((post, index) => (
        <Article key={index}>
          <Writer>
            <ProfileIcon size="medium">
              <Link to={`/user/${post.userFrom.nickname}`}>
                <img
                  src={post.userFrom.profileImage}
                  alt={post.userFrom.nickname}
                />
              </Link>
            </ProfileIcon>
            <Link to={`/user/${post.userFrom.nickname}`}>
              <UserNickname>{post.userFrom.nickname}</UserNickname>
            </Link>
          </Writer>
          <Picture>
            {post.filePath.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:5000/${img}`}
                alt={`postImage_${index}`}
              />
            ))}
          </Picture>
          <Details>
            <BtnUtil>
              <div>
                <button>
                  <BsHeart className="like-btn" />
                </button>
                <button>
                  <BsChat />
                </button>
                <button>
                  <IoPaperPlaneOutline />
                </button>
              </div>
              <div>
                <button>
                  <VscBookmark />
                </button>
              </div>
            </BtnUtil>
            <PostContent>
              <Link to={`/user/${post.userFrom.nickname}`}>
                <UserNickname>{post.userFrom.nickname}</UserNickname>
              </Link>
              <Description>{post.description}</Description>
            </PostContent>
            <CommentFactory postId={post._id} />
          </Details>
          <AddComment />
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

const Writer = styled.div`
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
  background-color: black;
  border-top: 1px solid ${palette.borderColor};
  border-bottom: 1px solid ${palette.borderColor};
  img {
    display: block;
    width: 100%;
  }
`;

const Details = styled.div`
  background-color: white;
  padding: 12px;
`;

const BtnUtil = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  button {
    padding: 0;
    cursor: pointer;
    background-color: transparent;
    &:not(:first-child) {
      margin-left: 10px;
    }
    svg {
      width: 26px;
      height: 26px;
    }
    .like-btn {
      width: 25px;
      height: 25px;
    }
  }
`;

const PostContent = styled.span`
  display: flex;
  align-items: flex-start;
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
