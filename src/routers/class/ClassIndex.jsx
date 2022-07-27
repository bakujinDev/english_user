import styled from "styled-components";
import DetailHeader from "../../components/header/DetailHeader";
import { D_classList } from "../../data/D_class";
import I_rtArw from "../../asset/icon/I_rtArw.svg";
import { useNavigate } from "react-router-dom";

export default function ClassIndex() {
  const navigate = useNavigate();

  return (
    <>
      <DetailHeader title="Class" />

      <ClassIndexBox>
        <nav className="navList">
          {D_classList.map((v, i) => (
            <button key={i} onClick={() => navigate(v.url)}>
              <p>{v.title}</p>

              <img src={I_rtArw} alt="" />
            </button>
          ))}
        </nav>
      </ClassIndexBox>
    </>
  );
}

const ClassIndexBox = styled.main`
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
      color: #353c49;
      border-bottom: 1px solid #aaa;
    }
  }
`;
