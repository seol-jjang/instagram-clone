import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
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

function PostDetailPage() {
  const params = useParams();
  const [post, setPost] = useState([]);
  const [newComment, setNewComment] = useState([]);
  const [responseTo, setResponseTo] = useState([]);
  const [likeNumber, setLikeNumber] = useState(0);
  const [visible, setVisible] = useState(false);
  const [postId, setPostId] = useState("");
  const [writer, setWriter] = useState("");

  useEffect(() => {
    let unmounted = false;
    let source = Axios.CancelToken.source();
    Axios.post("/api/post/getPostDetail", params, {
      cancelToken: source.token
    })
      .then((response) => {
        if (!unmounted) {
          if (response.data.success) {
            setPost(response.data.post);
          } else {
            alert("게시글을 불러오는 데 실패했습니다.");
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
  }, [params]);

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

  const refreshLike = (likeNumber) => {
    setLikeNumber(likeNumber);
  };

  const refreshComment = (newComment) => {
    setNewComment(newComment);
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
      {post.userFrom && (
        <Article>
          <WriteHeader>
            <div>
              <ProfileIcon size="medium">
                <Link to={`/${post.userFrom.nickname}`}>
                  <img
                    src={`http://localhost:5000/${post.userFrom.profileImage}`}
                    alt={post.userFrom.nickname}
                  />
                </Link>
              </ProfileIcon>
              <Link to={`/${post.userFrom.nickname}`}>
                <UserNickname>{post.userFrom.nickname}</UserNickname>
              </Link>
            </div>
            <MoreBtn onClick={() => onClickMore(post._id, post.userFrom._id)}>
              <IoIosMore />
            </MoreBtn>
          </WriteHeader>
          <PictureWrap>
            <ImageSlide images={post.filePath} detailPage />
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
                <div>
                  <ProfileIcon size="medium" className="profile-image">
                    <Link to={`/${post.userFrom.nickname}`}>
                      <img
                        src={`http://localhost:5000/${post.userFrom.profileImage}`}
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
                postId={post._id}
                refreshReplyComment={onReplyComment}
                newComment={newComment}
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
