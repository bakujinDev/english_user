import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  /* 
  html5doctor.com Reset Stylesheet
  v1.6.1
  Last Updated: 2010-09-17
  Author: Richard Clark - http://richclarkdesign.com 
  Twitter: @rich_clark
  */

  html, body, div, span, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  abbr, address, cite, code,
  del, dfn, em, img, ins, kbd, q, samp,
  small, strong, sub, sup, var,
  b, i,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section, summary,
  time, mark, audio, video {
      margin:0;
      padding:0;
      border:0;
      outline:0;
      font-size:100%;
      font-weight: inherit;
      vertical-align:baseline;
      background:transparent;
  }

  body {
      line-height:1;
  }

  article,aside,details,figcaption,figure,
  footer,header,hgroup,menu,nav,section { 
    display:block;
  }

  nav ul {
      list-style:none;
  }

  blockquote, q {
      quotes:none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
      content:'';
      content:none;
  }

  a {
      margin:0;
      padding:0;
      font-size:100%;
      vertical-align:baseline;
      background:transparent;
  }

  /* change colours to suit your needs */
  ins {
      background-color:#ff9;
      color:#000;
      text-decoration:none;
  }

  /* change colours to suit your needs */
  mark {
      background-color:#ff9;
      color:#000; 
      font-style:italic;
      font-weight:bold;
  }

  del {
      text-decoration: line-through;
  }

  abbr[title], dfn[title] {
      border-bottom:1px dotted;
      cursor:help;
  }

  table {
      border-collapse:collapse;
      border-spacing:0;
  }

  /* change border colour to suit your needs */
  hr {
      display:block;
      height:1px;
      border:0;   
      border-top:1px solid #cccccc;
      margin:1em 0;
      padding:0;
  }

  input, select {
      vertical-align:middle;
  }

/* reset End */

  body{
    &::-webkit-scrollbar {
      display: none;
    }
  }

  *{
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
      opacity: 0.4;
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
    border-radius: inherit;
    
    &::placeholder{
      color:#D0D0D0;
      opacity: 0.4;
    }
  }


  label,
  summary{
    cursor: pointer;
  }

  summary::-webkit-details-marker {
    display: none;
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


  .customInput{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 28px;
    color: #7b849c;
    border: 2px solid #484d5a;
    border-radius: 6px;
    
    &:focus-within {
      color: #fff;
      border-color: #1f5eff;
    }
  }


  .react-datepicker-popper{
  z-index: 4;
}

.customPicker{

  color: #7b849c;
  background: #2a2f3b;
  border-color: #1f5eff;
  overflow: hidden;

  .react-datepicker__header.react-datepicker__header--custom{
    padding: 0;
    border:none;
    border-bottom: 2px solid #484d5a;
  }


  
  .customHeader{
    height: 40px;
    font-weight: 600;
    color: #fff;
    background: #2a2f3b;
    border-color: #484d5a;
    
    button{
      font-weight: 600;
      color: #7b849c;

      &:active{
        color: #fff;
      }
    }
  
  }

  .react-datepicker__triangle{
    display: none;
  }

  .customHeader{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    font-size: 16px;

    button{
      font-size: 20px;
    }
  }

  .react-datepicker__month-container{

    .react-datepicker__month.react-datepicker__monthPicker{

     
      .react-datepicker__month-wrapper{
        .react-datepicker__month-text{
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 80px;
          height: 32px;
          font-weight: 600;

          &.react-datepicker__month-text--keyboard-selected{
            color: #fff;
            background: #2579ba;
          }
        }
      }
    }
  }
}
`;

export default GlobalStyle;
