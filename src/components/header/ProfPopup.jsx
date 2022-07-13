import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function ProfPopup() {
  const navigate = useNavigate();

  function onClickLogOutBtn() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <ProfPopupBox>
      <button className="logoutBtn" onClick={onClickLogOutBtn}>
        Logout
      </button>
    </ProfPopupBox>
  );
}

const ProfPopupBox = styled.section`
  width: 140px;
  padding: 10px;
  border-radius: 8px;
  background: rgba(120, 121, 241, 0.78);
  top: 50px;
  right: 0;
  position: absolute;
  z-index: 6;
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);

  button {
    width: 100%;
    height: 20px;
    font-weight: 500;
    text-align: start;
    color: #fff;
  }
`;
