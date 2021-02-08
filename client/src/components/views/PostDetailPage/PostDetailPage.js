import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { BsChat } from "react-icons/bs";
import { IoIosMore } from "react-icons/io";
import { VscBookmark } from "react-icons/vsc";
import {
  Inner,
  palette,
  ProfileIcon,
  UserNickname,
  viewportSize
} from "../../../styles/Theme";
import ImageSlide from "../../utils/ImageSlide";
import AddComment from "../../utils/AddComment";
import LikeBtn from "../../utils/LikeBtn";
import CommentFactory from "./Section/CommentFactory";
import LikeNumber from "../../utils/LikeNumber";
import Dialog from "../../utils/Dialog";
import Axios from "axios";
import ScrapBtn from "../../utils/ScrapBtn";

function PostDetailPage() {
  const user = useSelector((state) => state.user);
  const params = useParams();
  const history = useHistory();

  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [responseTo, setResponseTo] = useState([]);
  const [likeNumber, setLikeNumber] = useState(0);
  const [postId, setPostId] = useState("");
  const [writer, setWriter] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let unmounted = false;
    let source = Axios.CancelToken.source();

    Axios.post("/api/post/getPostDetail", params)
      .then((response) => {
        if (!unmounted) {
          if (response.data.success) {
            setPost(response.data.post);
          } else {
            history.push("/not-found");
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
    Axios.post("/api/comment/getComments", params)
      .then((response) => {
        if (!unmounted) {
          if (response.data.success) {
            setComments(response.data.comments);
          } else {
            history.push("/not-found");
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
  }, [history, params]);

  const refreshLike = (likeNumber) => {
    setLikeNumber(likeNumber);
  };

  const addComment = (newComment) => {
    setComments(comments.concat(newComment));
  };

  const deleteComment = (removeComment) => {
    const newComments = comments.filter(
      (comment) => comment._id !== removeComment
    );
    setComments(newComments);
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

  const onClickMore = (postId = "", userFrom = "") => {
    setVisible(!visible);
    setPostId(postId);
    setWriter(userFrom);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Inner>
      {post.userFrom && comments && (
        <Article>
          <WriteHeader>
            <div>
              <ProfileIcon size="medium">
                <Link to={`/${post.userFrom.nickname}`}>
                  <img
                    src={`${post.userFrom.profileImage}`}
                    alt={post.userFrom.nickname}
                  />
                </Link>
              </ProfileIcon>
              <Link to={`/${post.userFrom.nickname}`}>
                <UserNickname>{post.userFrom.nickname}</UserNickname>
              </Link>
            </div>
            {user.userData.isAuth && (
              <MoreBtn onClick={() => onClickMore(post._id, post.userFrom._id)}>
                <IoIosMore />
              </MoreBtn>
            )}
          </WriteHeader>
          <PictureWrap>
            <ImageSlide images={post.filePath} detailPage />
          </PictureWrap>
          <ContentsContainer isAuth={user.userData.isAuth}>
            {user.userData.isAuth && (
              <BtnUtil>
                <div>
                  <LikeBtn postId={post._id} refreshLike={refreshLike} />
                  <button>
                    <Link to={`/p/${post._id}`}>
                      <BsChat />
                    </Link>
                  </button>
                </div>
                <ScrapBtn postId={post._id} />
              </BtnUtil>
            )}
            <LikeNumber
              postId={post._id}
              newLikeNumber={likeNumber}
              detailPage
            />
            {user.userData.isAuth && (
              <AddComment
                postId={post._id}
                addReplyComment={onReplyComment}
                addComment={addComment}
                responseTo={responseTo}
                detailPage
              />
            )}
            <ScrollContainer isAuth={user.userData.isAuth}>
              <DetailContent>
                <div>
                  <ProfileIcon size="medium" className="profile-image">
                    <Link to={`/${post.userFrom.nickname}`}>
                      <img
                        src={`${post.userFrom.profileImage}`}
                        alt={post.userFrom.nickname}
                      />
                    </Link>
                  </ProfileIcon>
                </div>
                <div>
                  <Link to={`/${post.userFrom.nickname}`}>
                    <UserNickname>{post.userFrom.nickname}</UserNickname>
                  </Link>
                  <Description className="description">
                    {post.description}
                  </Description>
                </div>
              </DetailContent>
              <CommentFactory
                addReplyComment={onReplyComment}
                deleteComment={deleteComment}
                comments={comments}
              />
            </ScrollContainer>
          </ContentsContainer>
        </Article>
      )}
      <Dialog
        onClose={onClose}
        visible={visible}
        postId={postId}
        writer={writer}
        detailPage
      />
    </Inner>
  );
}

export default PostDetailPage;

const Article = styled.article`
  position: relative;
  margin-top: 80px;
  margin-bottom: 80px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${palette.borderColor};
  @media ${viewportSize.tablet} {
    margin-top: 55px;
    border: 0;
    border-bottom: 1px solid ${palette.borderColor};
  }
`;

const WriteHeader = styled.header`
  position: absolute;
  right: 0;
  width: 320px;
  height: 72px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
  background-color: white;
  & > div {
    display: flex;
    align-items: center;
  }
  a:hover {
    text-decoration: underline;
  }
  span {
    margin-right: 15px;
  }
  @media ${viewportSize.tablet} {
    position: static;
    width: 100%;
    height: 60px;
  }
`;

const MoreBtn = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  background-color: transparent;
  svg {
    width: 20px;
    height: 20px;
  }
`;

const PictureWrap = styled.div`
  position: relative;
  min-height: 450px;
  margin-right: 320px;
  border-right: 1px solid ${palette.borderColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #efefef;

  @media ${viewportSize.laptop} {
  }
  @media ${viewportSize.tablet} {
    max-width: 100%;
    min-height: 0;
    margin-right: 0;
    border-right: 0;
  }
`;

const ContentsContainer = styled.div`
  position: absolute;
  top: 72px;
  right: 0;
  bottom: 0;
  width: 320px;
  display: flex;
  flex-direction: column;
  background-color: white;
  & > section {
    order: 1;
  }
  @media ${viewportSize.tablet} {
    position: static;
    width: 100%;
    padding-bottom: 60px;
    & > section {
      order: 0;
    }
    ${(props) =>
      !props.isAuth &&
      css`
        padding-top: 16px;
      `}
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
  @media ${viewportSize.tablet} {
    display: none;
  }
  ${(props) =>
    !props.isAuth &&
    css`
      height: calc(100% - 56px);
      margin-bottom: 16px;
    `}
`;

const DetailContent = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 20px;
  .profile-image {
    margin-right: 15px;
  }
  .description {
    word-break: keep-all;
    margin-left: 10px;
  }
`;

const Description = styled.span`
  flex-basis: auto;
  font-size: 14px;
  white-space: pre-line;
  line-height: 1.3;
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
