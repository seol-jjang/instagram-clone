import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  ProfileIcon,
  palette,
  UserNickname,
  SubText
} from "../../../../styles/Theme";
import FollowingBtn from "./FollowingBtn";

function RandomUser() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    let unmounted = false;
    let source = Axios.CancelToken.source();
    Axios.post("/api/users/randomUser", { cancelToken: source.token })
      .then((response) => {
        if (!unmounted) {
          if (response.data.success) {
            setUserList(response.data.user);
          } else {
            alert("피드 불러오기를 실패했습니다");
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
  }, []);
  return (
    <ListWrap>
      {userList.length > 0 && (
        <>
          <Title>회원님을 위한 추천</Title>
          <List>
            {userList.map((user, index) => (
              <li key={index}>
                <div>
                  <ProfileIcon size="medium">
                    <Link to={`/${user.nickname}`}>
                      <img
                        src={`http://localhost:5000/${user.profileImage}`}
                        alt={user.nickname}
                      />
                    </Link>
                  </ProfileIcon>
                  <div>
                    <Link to={`/${user.nickname}`}>
                      <UserNickname>{user.nickname}</UserNickname>
                    </Link>
                    {user.name !== "" && <SubText>{user.name}</SubText>}
                  </div>
                </div>
                <FollowingBtn userTo={user._id} />
              </li>
            ))}
          </List>
        </>
      )}
    </ListWrap>
  );
}

export default RandomUser;

const ListWrap = styled.section`
  width: 100%;
  position: absolute;
  margin-top: 80px;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  margin-bottom: 15px;
  font-size: 14px;
  font-weight: bold;
  color: #8e8e8e;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  li {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    line-height: 1.2;
    & > div {
      display: flex;
      align-items: center;
    }
    & > div span {
      margin-right: 15px;
    }
  }
`;
