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
