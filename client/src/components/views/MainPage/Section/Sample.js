import Axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

function Sample() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    Axios.get("/api/post/getPosts").then((response) => {
      if (response.data.success) {
        setPosts(response.data.posts);
      } else {
        alert("피드 불러오기를 실패했습니다");
      }
    });
  }, []);

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <>
      {posts[3] && (
        <>
          <Slider {...settings}>
            {posts[3].filePath.map((img, index) => (
              <div key={index}>
                <img src={`http://localhost:5000/${img}`} alt="g" />
              </div>
            ))}
          </Slider>
        </>
      )}
    </>
  );
}

export default Sample;
