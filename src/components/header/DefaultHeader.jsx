import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import I_3lineWhite from "../../asset/icon/I_3lineWhite.svg";
import PopupBg from "../common/PopupBg";
import MenuBar from "./MenuBar";

export default function DefaultHeader() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  return (
    <>
      <PdefaultHeaderBox>
        <button className="logoBtn" onClick={() => navigate("/")}>
          Diana's English
        </button>

        {token ? (
          <span className="profBox" />
        ) : (
          <button className="loginBtn" onClick={() => navigate("/auth/login")}>
            LOGIN
          </button>
        )}
      </PdefaultHeaderBox>
    </>
  );
}

const PdefaultHeaderBox = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 20px;
  background: #7879f1;
  top: 0;
  right: 0;
  left: 0;
  position: sticky;
  z-index: 3;

  .logoBtn {
    display: flex;
    align-items: center;
    font-size: 20px;
    font-family: "Edu SA Beginner", cursive;
    color: #fff;
  }

  .profBox {
    width: 34px;
    aspect-ratio: 1;
    border: 1px solid #fff;
    border-radius: 50%;
  }

  .loginBtn {
    width: 124px;
    height: 34px;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 28px;
  }
`;
