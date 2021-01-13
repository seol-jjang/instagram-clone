import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import { BiSearch } from "react-icons/bi";
import { AiFillCloseCircle, AiOutlineLoading } from "react-icons/ai";
import styled, { keyframes } from "styled-components";
import { palette, viewportSize } from "../../../../styles/Theme";
import SearchDialog from "./SearchDialog";

function SearchContianer() {
  const [searchData, setSearchData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    if (visible === true) {
      inputRef.current.focus();
    } else {
      setInputValue("");
      setSearchData([]);
    }
  }, [visible]);

  useEffect(() => {
    if (inputValue !== "") {
      setLoading(true);
      const body = {
        value: inputValue
      };
      Axios.post("/api/users/matchUser", body).then((response) => {
        if (response.data.success) {
          setSearchData(response.data.user);
          setLoading(false);
        } else {
          setSearchData([]);
          setLoading(false);
        }
      });
    } else {
      setSearchData([]);
    }
  }, [inputValue]);

  const onChangeHandle = (event) => {
    const {
      target: { value }
    } = event;

    setInputValue(value);
  };

  const onClickHandle = () => {
    setVisible(!visible);
  };

  return (
    <>
      <SearchForm>
        <input
          type="text"
          placeholder="검색"
          ref={inputRef}
          value={inputValue}
          onChange={onChangeHandle}
        />
        {visible ? (
          <SearchInner>
            <span>
              <BiSearch />
            </span>
            {loading ? (
              <Loading>
                <AiOutlineLoading />
              </Loading>
            ) : (
              <span onClick={onClickHandle}>
                <AiFillCloseCircle />
              </span>
            )}
          </SearchInner>
        ) : (
          <SearchCover onClick={onClickHandle}>
            <span>
              <BiSearch />
            </span>
            <span>검색</span>
          </SearchCover>
        )}
        {visible && inputValue !== "" && (
          <SearchDialog
            onClose={onClickHandle}
            visible={visible}
            searchData={searchData}
          />
        )}
      </SearchForm>
      {visible && <Background onClick={onClickHandle}></Background>}
    </>
  );
}

export default SearchContianer;

const SearchForm = styled.form`
  cursor: text;
  position: relative;
  height: 28px;
  width: 215px;
  min-width: 215px;
  display: flex;
  align-items: center;
  border: 1px solid ${palette.borderColor};
  border-radius: 3px;
  font-size: 14px;
  span svg {
    width: 12px;
    height: 12px;
    fill: #aaa;
  }
  input {
    z-index: 2;
    width: 100%;
    height: 100%;
    border-radius: 3px;
    padding: 3px 10px 3px 25px;
    background-color: ${palette.backgroundGray};
    &::placeholder {
      font-size: 14px;
      color: #aaa;
    }
  }
  @media ${viewportSize.tablet} {
    display: none;
  }
`;

const SearchCover = styled.div`
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  background-color: ${palette.backgroundGray};
  span {
    color: #aaa;
  }
`;

const SearchInner = styled.div`
  z-index: 2;
  display: flex;
  align-items: center;
  span:first-child {
    position: absolute;
    top: 7px;
    left: 7px;
  }
  span:last-child {
    cursor: pointer;
    position: absolute;
    top: 5px;
    right: 5px;
    svg {
      width: 15px;
      height: 15px;
    }
  }
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
`;

const Rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg)
  }
`;

const Loading = styled.span`
  svg {
    animation: ${Rotation} 1s linear infinite;
  }
`;
