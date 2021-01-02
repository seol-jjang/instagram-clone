import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

function ImageSlide(props) {
  const wrap = useRef();
  const frame = useRef();
  const [currentImage, setCurrentImage] = useState(0);

  const onLoadHandle = (event) => {
    const width = event.target.width;
    const height = event.target.height;
    wrap.current.style.paddingBottom = `calc(${height}/${width} * 100%)`;
  };

  return (
    <>
      <Images ref={wrap}>
        {props.images.map((img, index) => (
          <li key={index} ref={frame}>
            {index === 0 ? (
              <img
                src={`http://localhost:5000/${img}`}
                alt={`postImage_${index + 1}`}
                onLoad={onLoadHandle}
              />
            ) : (
              <img
                src={`http://localhost:5000/${img}`}
                alt={`postImage_${index + 1}`}
                style={{
                  height: "100%",
                  transform: `translate(calc(${index}*612px))`
                }}
              />
            )}
          </li>
        ))}
      </Images>
    </>
  );
}

export default ImageSlide;

const Images = styled.ul`
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
`;
