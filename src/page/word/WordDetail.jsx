import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DetailHeader from "../../components/header/DetailHeader";
import WordList from "../../components/word/WordList";
import { API } from "../../config/api";
import { D_weeklyWordList } from "../../data/D_word";

export default function WordDetail() {
  const param = useParams();

  const [category, setCategory] = useState(false);
  const [wordObj, setWordObj] = useState([]);

  function getData() {
    axios
      .get(`${API.WORD_DETDATA}/weekly_word/${param.id - 1}`)
      .then(({ data }) => {
        console.log(data);
        setWordObj(data.resData);
      })
      .catch((err) => console.error(err));
  }

  function getDummy() {
    setWordObj(D_weeklyWordList[param.id]);
  }

  useEffect(() => {
    // getData();
    getDummy();
  }, []);

  return (
    <>
      <DetailHeader title={wordObj.name} />

      <WordDetailBox>
        <section className="topBar">
          <button
            className={`${category && "btnOn"} toggleBtn`}
            onClick={() => setCategory(!category)}
          >
            <p className="on">del</p>
            <span />
            <p className="off">left</p>
          </button>
        </section>

        <WordList category={category} wordObj={wordObj} />
      </WordDetailBox>
    </>
  );
}

const WordDetailBox = styled.main`
  height: 100%;
  padding: 50px 0 0;
  overflow-y: scroll;

  & > .topBar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 44px;
    padding: 0 14px;
    margin: 0 0 10px 0;

    .title {
      font-size: 20px;
      font-weight: 600;
    }

    .toggleBtn {
      display: flex;
      align-items: center;
      width: 60px;
      height: 24px;
      padding: 2px;
      border-radius: 16px;
      box-shadow: inset 0 2px rgba(0, 0, 0, 0.2);
      background: #484d5a;
      position: relative;

      &.btnOn {
        background: #7879f1;

        span {
          margin: 0 0 0 36px;
        }

        p {
          color: rgba(255, 255, 255, 0.8);

          &.on {
            opacity: 1;
          }

          &.off {
            opacity: 0;
          }
        }
      }

      p {
        font-weight: 500;
        color: rgba(255, 255, 255, 0.6);
        position: absolute;
        transition: 0.4s;

        &.on {
          left: 8px;
          opacity: 0;
        }

        &.off {
          right: 8px;
          opacity: 1;
        }
      }

      span {
        width: 20px;
        height: 20px;
        background: #fff;
        border-radius: 50%;
        transition: 0.4s;
      }
    }
  }
`;
