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
        font-family:  Helvetica,
		   'Apple SD Gothic Neo', 'Apple SD 산돌고딕 Neo', 
		   '맑은 고딕', 'malgun gothic',
		   'Microsoft NeoGothic', 
		   'Droid sans', sans-serif;
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
        &::placeholder {
            font-family:  Helvetica,
		   'Apple SD Gothic Neo', 'Apple SD 산돌고딕 Neo', 
		   '맑은 고딕', 'malgun gothic',
		   'Microsoft NeoGothic', 
		   'Droid sans', sans-serif;
      }
    }
`;
export default GlobalStyle;
