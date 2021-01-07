import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle
} from "react-icons/io";

function ImageSlide(props) {
  const TOTAL_SLIDES = props.images.length;
  const wrap = useRef();
  const slideRef = useRef();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const img = new Image();
    img.src = `http://localhost:5000/${props.images[0]}`;

    const width = img.width;
    const height = img.height;
    wrap.current.style.paddingBottom = `calc(${height}/${width} * 100%)`;
  }, [props.images]);

  useEffect(() => {
    slideRef.current.style.transition = "transform 0.3s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide <= TOTAL_SLIDES) {
      setCurrentSlide(currentSlide + 1);
      props.refreshCurrentImage(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide !== 0) {
      setCurrentSlide(currentSlide - 1);
      props.refreshCurrentImage(currentSlide - 1);
    }
  };

  return (
    <>
      <Images ref={wrap}>
        <SlideContainer ref={slideRef}>
          {props.images.map((img, index) => (
            <li
              key={index}
              style={{
                transform: `translateX(${index}00%)`
              }}
            >
              <img
                src={`http://localhost:5000/${img}`}
                alt={`postImage_${index + 1}`}
              />
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
    </>
  );
}

export default ImageSlide;

const btnStyle = css`
  cursor: pointer;
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: transparent;
  opacity: 0.5;
  svg {
    width: 100%;
    height: 100%;
    fill: white;
  }
`;

const PrevArrowBtn = styled.button`
  ${btnStyle}
  top: 50%;
  left: 10px;
`;
const NextArrowBtn = styled.button`
  ${btnStyle}
  top: 50%;
  right: 10px;
`;

const Images = styled.ul`
  display: flex;
  position: relative;
  overflow: hidden;
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
