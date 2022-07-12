import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  body{
    &::-webkit-scrollbar {
      display: none;
    }
  }

  *{
    padding:0;
    margin:0;
    font-family: 'Inter', sans-serif;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
    border: none;
    user-select: none;
    -webkit-text-size-adjust: none;
    -moz-text-size-adjust: none;
    -ms-text-size-adjust: none;
  }
  
  body{

  }
  
  u{
    text-decoration: underline;
  }
  
  *:link,
  *:visited{
    color:unset;
  }

  *:disabled {
    cursor: not-allowed;
  }
  
  *::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  
  *:focus{
    outline:none;
  }
  
  input{
    min-width: 0;
    font-size: inherit;
    font-family: inherit;
    color: inherit;
    background: unset;
    outline: none;
    user-select: auto;

    &::placeholder{
      color:#D0D0D0;
    }
    
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  textarea{
    font-size: inherit;
    font-family: inherit;
    color: inherit;
    
    &::placeholder{
      color:#D0D0D0;
    }
  }


  label,
  summary{
    cursor: pointer;
  }

  button{
    font-size: inherit;
    font-family: inherit;
    color: inherit;
    font-weight: inherit;
    background: none;
    cursor: pointer;
  }

  textarea{
    resize: none;
    user-select:auto;
  }

  &#BroadBox {
    background: #373737;
  }

  .nospace{
    width: 0;
    height: 0;
    position: absolute;
  }

  
  .posBox{
    position: relative;
  }
  
  
  //custom 
.defaultPopup{
  background: #fff;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  top: 50%;
  left: 50%;
  position: fixed;
  z-index: 6;
  transform: translate(-50%, -50%);
}
`;

export default GlobalStyle;
