import styled from "styled-components";
import DetailHeader from "../../components/header/DetailHeader";
import { useNavigate } from "react-router-dom";
import I_rtArw from "../../asset/icon/I_rtArw.svg";
import { useState } from "react";
import PopupBg from "../../components/common/PopupBg";
import TermPopup from "../../components/common/TermPopup";

export default function HelpIndex() {
  const navigate = useNavigate();

  const [termPopup, setTermPopup] = useState(false);

  return (
    <>
      <DetailHeader title="Help" />

      <WordIndexBox>
        <nav className="navList">
          <button onClick={() => setTermPopup(true)}>
            <p>Terms of service</p>

            <img src={I_rtArw} alt="" />
          </button>
        </nav>
      </WordIndexBox>

      {termPopup && (
        <>
          <TermPopup off={setTermPopup} />
          <PopupBg off={setTermPopup} />
        </>
      )}
    </>
  );
}

const WordIndexBox = styled.main`
  padding: 50px 0 0;

  .navList {
    button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 50px;
      padding: 0 20px;
      font-size: 18px;
      font-weight: 500;
      color: #7b849c;
      border-bottom: 1px solid #353c49;
    }
  }
`;
