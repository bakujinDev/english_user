import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import I_ltArwWhite from "../../asset/icon/I_ltArwWhite.svg";

export default function DetailHeader({ title, bg }) {
  const navigate = useNavigate();

  return (
    <DetailHeaderBox style={{ background: bg }}>
      <button className="beforeBtn" onClick={() => navigate(-1)}>
        <img src={I_ltArwWhite} alt="" />
      </button>

      <p className="title">{title}</p>

      <span className="blank" />
    </DetailHeaderBox>
  );
}

const DetailHeaderBox = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 50px;
  top: 0;
  height: 50px;
  padding: 0 20px;
  color: #fff;
  background: #7879f1;
  position: sticky;
  z-index: 3;

  .beforeBtn img,
  .blank {
    width: 12px;
  }

  .title {
    font-size: 18px;
    font-weight: 600;
    line-height: 18px;
  }
`;
