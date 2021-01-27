import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai";
import Button from "../../../styles/common/Button";
import { Inner, palette, viewportSize } from "../../../styles/Theme";
import FileUpload from "./FileUpload";

function PostUploadPage(props) {
  const user = useSelector((state) => state.user);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [load, setLoad] = useState(false);
  const [disable, setDisable] = useState(false);
  const wrap = useRef();
  const sampleImageRef = useRef();

  useEffect(() => {
    if (load) {
      const img = new Image();
      img.src = `${images[0]}`;
      wrap.current.style.paddingBottom = `calc(${img.height}/${img.width} * 100%)`;
    }
    return () => {
      setLoad(false);
    };
  }, [images, load]);

  useEffect(() => {
    if (images.length > 0) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [images.length]);

  const onTextChange = (event) => {
    const {
      target: { value }
    } = event;
    setDescription(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (images.length === 0) {
      return alert("이미지를 하나 이상 올려야 합니다");
    }
    const postObj = {
      userFrom: user.userData._id,
      description: description,
      filePath: images
    };
    Axios.post("/api/post/uploadPost", postObj).then((response) => {
      if (response.data.success) {
        setTimeout(() => {
          props.history.push("/");
        }, 1000);
      } else {
        alert("게시글 업로드에 실패했습니다.");
      }
    });
  };

  const onDelete = (image) => {
    const currentIndex = images.indexOf(image);

    let newImages = [...images];
    newImages.splice(currentIndex, 1);

    setImages(newImages);

    if (newImages.length > 0) {
      if (currentIndex === 0) {
        sampleImageRef.current.src = `${images[currentIndex + 1]}`;
      } else {
        sampleImageRef.current.src = `${images[currentIndex - 1]}`;
      }
    }
  };

  const onClickImage = (index) => {
    sampleImageRef.current.src = `${images[index]}`;
  };

  const updateImages = (newImage) => {
    setImages(images.concat(newImage));
  };

  return (
    <>
      <Inner>
        <ContentsSection>
          <UploadForm onSubmit={onSubmit} encType="multipart/form-data">
            <div>
              <FileUpload refreshFunction={updateImages} />
              <Button type="submit" disabled={!disable}>
                게시
              </Button>
            </div>
            <textarea
              onChange={onTextChange}
              value={description}
              placeholder={"문구 입력..."}
            ></textarea>
          </UploadForm>
          <SampleImages>
            {images.length > 0 && (
              <PictureWrap ref={wrap} onLoad={() => setLoad(true)}>
                <img src={`${images[0]}`} alt={`img`} ref={sampleImageRef} />
              </PictureWrap>
            )}
            <ImageList>
              {images.map((image, index) => (
                <li key={index}>
                  <button
                    className="delete-btn"
                    onClick={() => onDelete(image)}
                  >
                    <AiFillCloseCircle />
                  </button>
                  <img
                    src={`${image}`}
                    alt={`postImg_${index}`}
                    onClick={() => onClickImage(index)}
                  />
                </li>
              ))}
            </ImageList>
          </SampleImages>
        </ContentsSection>
      </Inner>
    </>
  );
}

export default withRouter(PostUploadPage);

const ContentsSection = styled.section`
  position: relative;
  margin-top: 85px;
  margin-bottom: 50px;
  @media ${viewportSize.tablet} {
    margin-top: 55px;
  }
`;

const UploadForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  & > div {
    height: 56px;
    margin-bottom: 10px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${palette.borderColor};
    background-color: white;
    @media ${viewportSize.tablet} {
      margin-bottom: 0;
      border: 0;
      border-bottom: 1px solid ${palette.borderColor};
    }
  }
  textarea {
    height: 18px;
    min-height: 80px;
    padding: 10px;
    flex-grow: 1;
    border: 1px solid ${palette.borderColor};
    outline: none;
    resize: none;
    background-color: white;
    font-family: "Noto Sans KR", "Segoe UI", "맑은 고딕", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    @media ${viewportSize.tablet} {
      border: 0;
      border-bottom: 1px solid ${palette.borderColor};
    }
  }
  button {
    margin: 0;
    padding: 0;
    background-color: transparent;
    color: ${palette.ActivatedColor};
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    &:disabled {
      opacity: 0.3;
      cursor: default;
      pointer-events: none;
    }
  }
`;

const SampleImages = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  @media ${viewportSize.tablet} {
    display: flex;
    flex-direction: column;
  }
`;

const PictureWrap = styled.div`
  position: relative;
  overflow: hidden;
  max-width: 614px;
  width: 614px;
  background-color: black;
  border: 1px solid ${palette.borderColor};
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
  }
`;

const ImageList = styled.ul`
  align-self: start;
  display: flex;
  flex-wrap: wrap;
  li {
    position: relative;
    margin-right: 10px;
    margin-bottom: 10px;
    width: 100px;
    height: 100px;
    .delete-btn {
      cursor: pointer;
      z-index: 1;
      position: absolute;
      top: -5px;
      right: -5px;
      display: flex;
      padding: 0;
      opacity: 0.7;
      background-color: white;
      border-radius: 50%;
      svg {
        width: 20px;
        height: 20px;
      }
    }
    img {
      cursor: pointer;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
      border: 1px solid ${palette.borderColor};
    }
  }
`;
