import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { palette } from "./Theme";

const GlobalStyle = createGlobalStyle`
    ${reset};
    
    body {
        margin: 0;
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #fafafa;
    }
    * {
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');
        font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
        "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", 
        "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        box-sizing: border-box;
        color: ${palette.blackColor}
    }

    a {
        text-decoration: none;
        font-size: 0;
        color: black;
    }
    button,
    input {
        outline: none;
        border: none;
    }

    textarea {
        font-family: "Noto Sans KR", "Segoe UI", "맑은 고딕", "Roboto", "Oxygen",
          "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
          sans-serif;
        &::placeholder {
        font-family: "Noto Sans KR", "Segoe UI", "맑은 고딕", "Roboto", "Oxygen",
          "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
          sans-serif;
      }
    }
`;
export default GlobalStyle;
