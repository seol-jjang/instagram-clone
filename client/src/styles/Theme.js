import styled, { css } from "styled-components";

export const palette = {
  borderColor: "#dbdbdb",
  backgroundGray: "#fafafa",
  ActivatedColor: "#0195f7",
  grayText: "#aaaaaa",
  blackColor: "#262626"
};

export const viewportSize = {
  mobile: "(max-width: 450px)",
  tablet: "(max-width: 735px)",
  laptop: "(max-width: 999px)",
  desktop: "(min-width: 1000px)"
};

export const Inner = styled.div`
  position: relative;
  width: 935px;
  margin: 0 auto;

  @media ${viewportSize.laptop} {
    width: 100%;
    padding: 0 20px;
  }
  @media ${viewportSize.tablet} {
    padding: 0;
  }
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
