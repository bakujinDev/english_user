import styled from "styled-components";

export default function AlertPopup({ cont, off }) {
  return (
    <AlertPopupBox className="defaultPopup">
      <p className="cont">{cont}</p>

      <button className="confirmBtn" onClick={() => off()}>
        OK
      </button>
    </AlertPopupBox>
  );
}

const AlertPopupBox = styled.section`
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

  .cont {
  }

  .confirmBtn {
    width: 80%;
    height: 40px;

    color: #fff;
    background: #7879f1;
    border-radius: 10px;
  }
`;
