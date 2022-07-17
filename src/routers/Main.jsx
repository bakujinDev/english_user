import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DefaultHeader from "../components/header/DefaultHeader";
import I_class from "../asset/icon/I_class.png";
import I_word from "../asset/icon/I_word.png";

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
              <p>Class</p>
            </button>

            <button className="" onClick={() => navigate("/word")}>
              <img src={I_word} alt="" />
              <p>Word</p>
            </button>
          </nav>
        </section>
      </MainBox>
    </>
  );
}

const MainBox = styled.main`
  height: 100%;
  padding: 20px;
  overflow-y: scroll;

  .innerBox {
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
        aspect-ratio: 1;
        font-size: 20px;
        font-weight: 400;
        background: #fff;
        border-radius: 28px;
        box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);

        &:disabled {
          opacity: 0.4;
        }

        img {
          height: 50%;
        }
      }
    }
  }
`;
