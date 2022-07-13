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
  width: 300px;
  padding: 24px 20px;

  .cont {
  }

  .confirmBtn {
    width: 80px;
    height: 40px;

    color: #fff;
    background: #7879f1;
    border-radius: 10px;
  }
`;
