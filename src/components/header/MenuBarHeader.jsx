import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as I_x } from "../../asset/icon/I_x.svg";

export default function MenuBarHeader({ off }) {
  const navigate = useNavigate();

  return (
    <>
      <PmenuBarHeaderBox>
        <button className="logoBtn" onClick={() => navigate("/")}>
          Diana's Class
        </button>

        <button className="exitBtn" onClick={() => off()}>
          <I_x />
        </button>
      </PmenuBarHeaderBox>
    </>
  );
}

const PmenuBarHeaderBox = styled.header`
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
  z-index: 60;

  .logoBtn {
    display: flex;
    align-items: center;
    font-size: 20px;
    font-family: "Edu SA Beginner", cursive;
    color: #fff;
  }

  .exitBtn {
    display: flex;
    align-items: center;

    svg {
      width: 18px;
      height: 18px;

      .stroke {
        stroke: #fff;
      }
    }
  }
`;
