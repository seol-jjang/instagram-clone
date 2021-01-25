import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { palette } from "./Theme";

const GlobalStyle = createGlobalStyle`
    ${reset}
    @import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);
    
    body {
        margin: 0;
        box-sizing: border-box;
        font-family: 'Noto Sans KR', "Segoe UI", "맑은 고딕", "Roboto", "Oxygen", "Ubuntu", "Cantarell",
            "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #fafafa;
    }
    * {
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
`;
export default GlobalStyle;
