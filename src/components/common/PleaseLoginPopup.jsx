import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function PleaseLoginPopup() {
  const navigate = useNavigate();

  return (
    <PleaseLoginPopupBox className="defaultPopup">
      <p className="explain">
        For using this contents, your name is required
        <br />
        Please log in and use it
      </p>

      <div className="btnBox">
        <button className="confirmBtn" onClick={() => navigate("/auth/login")}>
          OK
        </button>

        <button className="cancelBtn" onClick={() => navigate("/")}>
          Dont mind
        </button>
      </div>
    </PleaseLoginPopupBox>
  );
}

const PleaseLoginPopupBox = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  width: 360px;
  padding: 24px 20px;

  .explain {
    width: 240px;
    font-size: 16px;
    text-align: center;
  }

  .btnBox {
    display: flex;
    gap: 20px;
    width: 100%;

    button {
      flex: 1;
      height: 44px;
      border-radius: 10px;

      &.confirmBtn {
        color: #fff;
        background: #7879f1;
      }

      &.cancelBtn {
        color: #7879f1;
        border: 1px solid #7879f1;
      }
    }
  }
`;
