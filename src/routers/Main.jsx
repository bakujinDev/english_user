import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DefaultHeader from "../components/header/DefaultHeader";
import I_class from "../asset/menu/I_class.png";
import I_word from "../asset/menu/I_word.png";
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
              <p>Class</p>
            </button>

            <button className="" onClick={() => navigate("/word")}>
              <img src={I_word} alt="" />
              <p>Word</p>
            </button>

            <button
              className=""
              onClick={() => navigate("/laboratory")}
            >
              <img src={I_laboratory} alt="" />
              <p>Laboratory</p>
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
        max-width: 50%;
        aspect-ratio: 1;
        font-size: 20px;
        font-weight: 400;
        text-transform: capitalize;
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
