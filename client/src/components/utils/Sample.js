import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import Slider from "react-slick";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle
} from "react-icons/io";

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <ArrowBtn onClick={onClick} className={className}>
      <IoIosArrowDropleftCircle />
    </ArrowBtn>
  );
};
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <ArrowBtn onClick={onClick} className={className}>
      <IoIosArrowDroprightCircle />
    </ArrowBtn>
  );
};

function ImageSlide(props) {
  const frame = useRef();

  const onLoadHandle = (event) => {
    const width = event.target.width;
    const height = event.target.height;
    frame.current.parentElement.style.paddingBottom = `calc(${height}/${width} * 100%)`;
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <>
      <Images>
        <Slider {...settings}>
          {props.images.map((img, index) =>
            index === 0 ? (
              <li key={index} ref={frame}>
                <img
                  src={`http://localhost:5000/${img}`}
                  alt={`postImage_${index + 1}`}
                  onLoad={onLoadHandle}
                />
              </li>
            ) : (
              <li key={index}>
                <img
                  src={`http://localhost:5000/${img}`}
                  alt={`postImage_${index + 1}`}
                  style={{
                    height: "100%"
                  }}
                />
              </li>
            )
          )}
        </Slider>
      </Images>
    </>
  );
}

export default ImageSlide;

const Images = styled.ul`
  .slick-arrow {
    z-index: 1;
  }
  .slick-prev {
    left: 20px;
    &::before {
      content: "";
    }
  }
  .slick-next {
    right: 20px;
    &::before {
      content: "";
    }
  }
  .slick-slide {
    div {
      height: 0;
      position: relative;
      display: block;
      overflow: hidden;
      padding-bottom: 100%;
      li {
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          object-fit: cover;
        }
      }
    }
  }
`;

const ArrowBtn = styled.div`
  width: 30px;
  height: 30px;
  background-color: transparent;
  opacity: 0.5;
  svg {
    width: 100%;
    height: 100%;
    fill: white;
  }
`;
