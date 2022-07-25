import styled from "styled-components";
import DetailHeader from "../../components/header/DetailHeader";
import { D_classList } from "../../data/D_class";
import I_rtArw from "../../asset/icon/I_rtArw.svg";
import { useNavigate } from "react-router-dom";
import { D_experimentList } from "../../data/D_laboratory";

export default function ExperimentIndex() {
  const navigate = useNavigate();

  return (
    <>
      <DetailHeader title="Class" />

      <ExperimentIndexBox>
        <nav className="navList">
          {D_experimentList.map((v, i) => (
            <button key={i} onClick={() => navigate(v.url)}>
              <p>{v.title}</p>

              <img src={I_rtArw} alt="" />
            </button>
          ))}
        </nav>
      </ExperimentIndexBox>
    </>
  );
}

const ExperimentIndexBox = styled.main`
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
