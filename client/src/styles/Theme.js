import styled, { css } from "styled-components";

export const palette = {
  borderColor: "#dbdbdb",
  backgroundGray: "#fafafa",
  ActivatedColor: "#0195f7",
  grayText: "#aaaaaa",
  blackColor: "#262626"
};

export const Inner = styled.div`
  position: relative;
  width: 935px;
  max-width: 935px;
  margin: 0 auto;
`;

export const MainContents = styled.main``;

export const UserNickname = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: ${palette.blackColor};
  ${(props) =>
    props.large &&
    css`
      font-size: 28px;
      font-weight: normal;
    `}
`;
export const SubText = styled.p`
  font-size: 14px;
  color: ${palette.grayText};
`;

const ProfileIconSize = {
  small: {
    width: "22px",
    height: "22px"
  },
  medium: {
    width: "32px",
    height: "32px"
  },
  large: {
    width: "56px",
    height: "56px"
  },
  xLarge: {
    width: "150px",
    height: "150px"
  }
};

export const ProfileIcon = styled.span`
  display: block;
  ${({ size }) => css`
    width: ${ProfileIconSize[size].width};
    height: ${ProfileIconSize[size].height};
  `}
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const SmallProfileIcon = styled.span`
  display: block;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const MediumProfileIcon = styled.span`
  display: block;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const LargeProfileIcon = styled.span`
  display: block;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const XLargeProfileIcon = styled.span`
  display: block;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`;
