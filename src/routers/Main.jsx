import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DefaultHeader from "../components/header/DefaultHeader";
import I_class from "../asset/menu/I_class.png";
import I_word from "../asset/menu/I_word.png";
import I_record from "../asset/menu/I_record.svg";
import I_qna from "../asset/menu/I_qna.png";
import I_laboratory from "../asset/menu/I_laboratory.png";

export default function Main() {
  const navigate = useNavigate();

  return (
    <>
      <DefaultHeader />

      <MainBox>
        <section className="innerBox">
          <nav>
            <button className="" onClick={() => navigate("/class")}>
              <img src={I_class} alt="" />
              <h1>Class</h1>
            </button>

            <button className="" onClick={() => navigate("/word")}>
              <img src={I_word} alt="" />
              <h1>Word</h1>
            </button>

            <button className="" onClick={() => navigate("/record")}>
              <img src={I_record} alt="" />
              <h1>Record</h1>
            </button>

            <button className="" onClick={() => navigate("/help")}>
              <img src={I_qna} alt="" />
              <h1>Help</h1>
            </button>

            {/* <button className="" onClick={() => navigate("/laboratory")}>
              <img src={I_laboratory} alt="" />
              <h1>Laboratory</h1>
            </button> */}
          </nav>
        </section>
      </MainBox>
    </>
  );
}

const MainBox = styled.main`
  height: 100%;
  padding: 50px 20px 0;
  overflow-y: scroll;

  .innerBox {
    padding: 20px 0 0;

    nav {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      button {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 8px;
        min-width: calc(50% - 6px);
        max-width: 50%;
        aspect-ratio: 1;
        color: #fff;
        text-transform: capitalize;
        background: #323741;
        border-radius: 28px;
        box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);

        &:disabled {
          opacity: 0.4;
        }

        img {
          max-width: 50%;
          height: 50%;
          object-fit: contain;
          filter: saturate(0.84);
        }

        h1 {
          font-size: 20px;
          font-weight: 500;
        }
      }
    }
  }
`;
