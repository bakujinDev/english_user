import { useEffect, useRef } from "react";
import styled from "styled-components";
import I_kakao from "../../asset/icon/I_kakao.svg";
import MenuBarHeader from "./MenuBarHeader";

export default function MenuBar({ off }) {
  const barRef = useRef();

  function onClickExit() {
    barRef.current.style.transform = "translate(100%, 0)";
    setTimeout(() => off(), 400);
  }

  function onClickChat() {
    window.Kakao.Channel.chat({
      channelPublicId: "_xdSxkkb",
    });
  }

  useEffect(() => {
    if (window.Kakao) {
      const kakao = window.Kakao;

      if (!kakao.isInitialized())
        kakao.init("96c40e066c51c206603aeb9c053cd42c");
    }

    setTimeout(() => {
      barRef.current.style.transform = "translate(0, 0)";
    }, 0);
  }, []);

  return (
    <>
      <MenuBarHeader off={onClickExit} />

      <PmenuBarBox ref={barRef}>
        <footer>
          <div className="suggestBox">
            <p className="key">
              If anything you want to suggest,
              <br />
              please connect with us
            </p>

            <button className="inquiryBtn" onClick={onClickChat}>
              <img src={I_kakao} alt="" />
            </button>
          </div>
        </footer>
      </PmenuBarBox>
    </>
  );
}

const PmenuBarBox = styled.aside`
  width: 100%;
  padding: 0 20px;
  background: #fff;
  overflow: hidden;
  top: 50px;
  right: 0;
  bottom: 0;
  position: fixed;
  z-index: 6;
  transition: 0.4s;
  transform: translate(100%, 0);

  footer {
    display: flex;
    justify-content: center;

    .suggestBox {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      text-align: center;

      .key {
        font-size: 16px;
      }

      .inquiryBtn {
        display: flex;
        align-items: center;

        img {
          width: 40px;
          border-radius: 10px;
        }
      }
    }
  }
`;
