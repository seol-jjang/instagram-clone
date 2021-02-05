import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle
} from "react-icons/io";

function ImageSlide({ images, detailPage }) {
  const TOTAL_SLIDES = images.length;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [load, setLoad] = useState(false);
  const wrap = useRef();
  const slideRef = useRef();

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
    slideRef.current.style.transition = "transform 0.3s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide <= TOTAL_SLIDES) {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide !== 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <>
      <Images ref={wrap} onLoad={() => setLoad(true)}>
        <SlideContainer ref={slideRef}>
          {images.map((img, index) => (
            <li
              key={index}
              style={{
                transform: `translateX(${index}00%)`
              }}
            >
              <img src={`${img}`} alt={`postImage_${index + 1}`} />
            </li>
          ))}
        </SlideContainer>
      </Images>
      {TOTAL_SLIDES !== 1 && (
        <>
          {currentSlide !== 0 && (
            <PrevArrowBtn onClick={prevSlide}>
              <IoIosArrowDropleftCircle />
            </PrevArrowBtn>
          )}
          {currentSlide + 1 !== TOTAL_SLIDES && (
            <NextArrowBtn onClick={nextSlide}>
              <IoIosArrowDroprightCircle />
            </NextArrowBtn>
          )}
        </>
      )}
      {!detailPage && (
        <>
          {TOTAL_SLIDES > 1 && (
            <DotsWrap>
              {images.map((img, index) =>
                index === currentSlide ? (
                  <Dot key={index} current>
                    {index + 1}
                  </Dot>
                ) : (
                  <Dot key={index}>{index + 1}</Dot>
                )
              )}
            </DotsWrap>
          )}
        </>
      )}
    </>
  );
}

export default ImageSlide;

const btnStyle = css`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 140px;
  height: 100%;
  cursor: pointer;
  background-color: transparent;
  opacity: 0.5;
  svg {
    position: absolute;
    top: calc(50% - 15px);
    width: 30px;
    height: 30px;
    fill: white;
  }
`;

const PrevArrowBtn = styled.button`
  ${btnStyle}
  left: 0;
  svg {
    left: 20px;
  }
`;
const NextArrowBtn = styled.button`
  ${btnStyle}
  right: 0;
  svg {
    right: 20px;
  }
`;

const Images = styled.ul`
  display: flex;
  position: relative;
  overflow: hidden;
  padding-bottom: 100%;
`;

const SlideContainer = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  li {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
    }
  }
`;

const DotsWrap = styled.div`
  position: absolute;
  left: calc(50% - 15px);
  margin: 17px 0;
  display: flex;
`;

const Dot = styled.span`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #a8a8a8;
  font-size: 0;
  &:not(:last-child) {
    margin-right: 5px;
  }
  ${(props) =>
    props.current &&
    css`
      background-color: #0095f6;
    `}
`;
