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

function PostDetailPage(props) {
  const params = useParams();
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [responseTo, setResponseTo] = useState([]);
  const [likeNumber, setLikeNumber] = useState(0);

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

    const likeVariable = {
      postId: post._id
    };

    Axios.post("/api/like/getLikes", likeVariable).then((response) => {
      if (response.data.success) {
        setLikeNumber(response.data.likes.length);
      } else {
        alert("좋아요 정보를 가져오는 데 실패했습니다.");
      }
    });
  }, [params, post._id, props.userId]);

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
                <ScrollContainer>
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
                      {comments.map(
                        (comment, index) =>
                          !comment.responseTo && (
                            <article key={index}>
                              <div>
                                <Writer>
                                  <ProfileIcon
                                    size="medium"
                                    className="profile-image"
                                  >
                                    <Link
                                      to={`/user/${comment.userFrom.nickname}`}
                                    >
                                      <img
                                        src={`http://localhost:5000/${comment.userFrom.profileImage}`}
                                        alt={comment.userFrom.nickname}
                                      />
                                    </Link>
                                  </ProfileIcon>
                                  <SingleComment
                                    comment={comment}
                                    refreshReplyComment={onReplyComment}
                                    likeNumber={likeNumber}
                                  />
                                </Writer>
                                <LikeBtn
                                  commentId={comment._id}
                                  refreshLike={refreshLike}
                                />
                              </div>
                              <ReplyComment
                                comments={comments}
                                refreshReplyComment={onReplyComment}
                                parentCommentId={comment._id}
                              />
                            </article>
                          )
                      )}
                    </Comment>
                  )}
                </ScrollContainer>
                <UtilContainer>
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
                  <LikeText>좋아요 {likeNumber}개</LikeText>
                  <AddComment
                    postId={post._id}
                    refreshComment={refreshComment}
                    refreshReplyComment={onReplyComment}
                    responseTo={responseTo}
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
  height: 100%;
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
  width: 100%;
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

const ScrollContainer = styled.div`
  height: 290px;
  overflow: scroll;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
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
  background-color: white;
  border-top: 1px solid ${palette.borderColor};
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
`;

const BtnUtil = styled.div`
  padding: 10px 15px 0;
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
      padding-top: 1px;
    }
  }
`;

const LikeText = styled.p`
  padding: 5px 15px;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: bold;
  color: ${palette.blackColor};
`;

const Comment = styled.section`
  display: flex;
  flex-direction: column;
  article {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    & > div:first-child {
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
    }
    button {
      cursor: pointer;
      padding: 0;
      display: flex;
      background-color: transparent;
    }
  }
`;
