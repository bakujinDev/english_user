import styled from "styled-components";

export default function PleaseLoginPopup({ off }) {
  return (
    <PleaseLoginPopupBox className="defaultPopup">
      <p className="explain">
        For using this contents,
        <br />
        your name is required.
        <br />
        <strong>Please log in</strong> and use it
      </p>

      <div className="btnBox">
        <button className="confirmBtn" onClick={() => off()}>
          OK
        </button>

        <button className="cancelBtn" onClick={() => off()}>
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
  max-width: 360px;
  width: 90vw;
  padding: 24px 20px;
  color: #7b849c;
  background: #2a2f3b;
  border: 2px solid #484d5a;

  .explain {
    width: 240px;
    font-size: 16px;
    text-align: center;

    strong {
      color: #fff;
    }
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
