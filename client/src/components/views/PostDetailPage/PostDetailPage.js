import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { BsHeart, BsHeartFill, BsChat } from "react-icons/bs";
import { VscBookmark } from "react-icons/vsc";
import {
  Inner,
  palette,
  ProfileIcon,
  UserNickname
} from "../../../styles/Theme";
import ImageSlide from "../../utils/ImageSlide";
import AddComment from "../../utils/AddComment";

function PostDetailPage(props) {
  const params = useParams();
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    Axios.post("/api/post/getPostDetail", params).then((response) => {
      if (response.data.success) {
        setPost(response.data.post);
        const variable = { postId: response.data.post._id };
        getComments(variable);
      } else {
        alert("게시글을 불러오는 데 실패했습니다.");
      }
    });
  }, [params]);

  const getComments = (variable) => {
    Axios.post("/api/comment/getComments", variable).then((response) => {
      if (response.data.success) {
        setComments(response.data.comments);
      } else {
        alert("댓글 정보를 불러오는 데 실패했습니다.");
      }
    });
  };

  const refreshComment = (variable) => {
    getComments(variable);
  };

  return (
    <Inner>
      <PostDetailWrap>
        {post.userFrom && (
          <>
            <Picture>
              <ImageSlide images={post.filePath} />
            </Picture>
            <InfoContainer>
              <HeaderUser>
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
              </HeaderUser>
              <PostContents>
                <div>
                  <Writer>
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
                  </Writer>
                  {comments.length !== 0 && (
                    <Comment>
                      <section>
                        {comments.map((comment, index) => (
                          <article key={index}>
                            <Writer>
                              <ProfileIcon
                                size="medium"
                                className="profile-image"
                              >
                                <Link to={`/user/${comment.userFrom.nickname}`}>
                                  <img
                                    src={`http://localhost:5000/${post.userFrom.profileImage}`}
                                    alt={comment.userFrom.nickname}
                                  />
                                </Link>
                              </ProfileIcon>
                              <Link to={`/${comment.userFrom.nickname}`}>
                                <UserNickname>
                                  {comment.userFrom.nickname}
                                </UserNickname>
                              </Link>
                              <span className="comment">{comment.content}</span>
                            </Writer>
                            <button>
                              <BsHeart size="12px" />
                            </button>
                          </article>
                        ))}
                      </section>
                    </Comment>
                  )}
                </div>
                <UtilContainer>
                  <BtnUtil>
                    <div>
                      <button>
                        <BsHeart className="like-btn" />
                      </button>
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
                  <AddComment
                    postId={post._id}
                    refreshComment={refreshComment}
                  />
                </UtilContainer>
              </PostContents>
            </InfoContainer>
          </>
        )}
      </PostDetailWrap>
    </Inner>
  );
}

export default PostDetailPage;

const PostDetailWrap = styled.section`
  margin-top: 80px;
  display: flex;
  flex-direction: row;
  border: 1px solid ${palette.borderColor};
  background-color: white;
`;

const Picture = styled.div`
  max-width: 614px;
  width: 100%;
  position: relative;
  background-color: black;
`;

const InfoContainer = styled.div`
  position: relative;
  flex-grow: 1;
`;

const HeaderUser = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 13px 15px;
  border-bottom: 1px solid ${palette.borderColor};
  a:hover {
    text-decoration: underline;
  }
  span {
    margin-right: 15px;
  }
`;

const PostContents = styled.div`
  padding: 13px 15px;
  & > div:first-child {
    margin-top: 65px;
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

const Description = styled.span`
  font-size: 14px;
  white-space: pre-line;
`;

const UtilContainer = styled.div`
  border-top: 1px solid ${palette.borderColor};
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const BtnUtil = styled.div`
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  }
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  article {
    display: flex;
    justify-content: space-between;
    margin-top: 7px;
    div {
      display: flex;
      a:hover {
        text-decoration: underline;
      }
      .comment {
        font-size: 14px;
        margin-left: 5px;
      }
    }
    button {
      cursor: pointer;
      padding: 0;
      display: flex;
      background-color: transparent;
    }
  }
`;
