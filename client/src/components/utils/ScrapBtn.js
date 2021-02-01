import Axios from "axios";
import React, { useEffect, useState } from "react";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";

function ScrapBtn(props) {
  const [scrapAction, setScrapAction] = useState(false);
  const userId = localStorage.getItem("ls");

  useEffect(() => {
    let scrapVariable = { postId: props.postId };
    let unmounted = false;
    let source = Axios.CancelToken.source();
    Axios.post("/api/scrap/getScrap", scrapVariable, {
      cancelToken: source.token
    })
      .then((response) => {
        if (!unmounted) {
          if (response.data.success) {
            // eslint-disable-next-line array-callback-return
            response.data.scrap.map((scrap) => {
              if (scrap.userFrom === userId) {
                setScrapAction(true);
              }
            });
          } else {
            alert("스크랩 정보를 가져오는 데 실패했습니다");
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
  }, [props.postId, userId]);

  const onClickLike = () => {
    let scrapVariable = { postId: props.postId, userFrom: userId };
    if (scrapAction) {
      Axios.post("/api/scrap/addScrap", scrapVariable).then((response) => {
        if (response.data.success) {
          setScrapAction(false);
        } else {
          alert("스크랩을 삭제하는 데 실패했습니다");
        }
      });
    } else {
      Axios.post("/api/scrap/addScrap", scrapVariable).then((response) => {
        if (response.data.success) {
          setScrapAction(true);
        } else {
          alert("스크랩 하는 데 실패했습니다");
        }
      });
    }
  };

  return (
    <>
      {scrapAction ? (
        <button onClick={onClickLike}>
          <IoBookmark />
        </button>
      ) : (
        <button onClick={onClickLike}>
          <IoBookmarkOutline />
        </button>
      )}
    </>
  );
}

export default ScrapBtn;
