import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import I_defaultProfImg from "../../asset/icon/I_defaultProfImg.svg";
import PopupBg from "../common/PopupBg";
import ProfPopup from "./ProfPopup";

export default function DefaultHeader() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [profPopup, setProfPopup] = useState(false);

  return (
    <>
      <PdefaultHeaderBox>
        <button className="logoBtn" onClick={() => navigate("/")}>
          Diana's English
        </button>

        {token ? (
          <span className="profBox">
            <button className="profBtn" onClick={() => setProfPopup(true)}>
              <img src={I_defaultProfImg} alt="" />
            </button>

            {profPopup && (
              <>
                <ProfPopup off={setProfPopup} />
                <PopupBg off={setProfPopup} />
              </>
            )}
          </span>
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
  position: fixed;
  z-index: 3;

  .logoBtn {
    display: flex;
    align-items: center;
    font-size: 20px;
    font-family: "Edu SA Beginner", cursive;
    color: #fff;
  }

  .profBox {
    position: relative;

    .profBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 34px;
      height: 34px;
      border: 1px solid #fff;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 22px;
      }
    }
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
