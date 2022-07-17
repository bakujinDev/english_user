import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DetailHeader from "../../components/header/DetailHeader";
import WordList from "../../components/word/WordList";
import { API } from "../../config/api";

export default function WordDetail() {
  const param = useParams();

  const [category, setCategory] = useState(false);
  const [title, setTitle] = useState("");
  const [listData, setListData] = useState([]);

  function getData() {
    axios
      .get(`${API.WORD_DETDATA}/weekly_word/${param.id - 1}`)
      .then(({ data }) => {
        console.log(data);
        setTitle(data.resData.name);
        setListData(data.resData.value);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <DetailHeader title={title} />

      <WordDetailBox>
        {/* <section className="topBar">
          <button
            disabled
            className={`${category && "on"} toggleBtn`}
            onClick={() => setCategory(!category)}
          >
            <p className="on">del</p>
            <span />
            <p className="off">left</p>
          </button>
        </section> */}

        {category ? (
          <WordList listData={listData} />
        ) : (
          <WordList listData={listData} />
        )}
      </WordDetailBox>
    </>
  );
}

const WordDetailBox = styled.main`
  height: 100%;
  overflow-y: scroll;

  & > .topBar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 44px;
    padding: 0 14px;
    margin: 0 0 10px 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

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
      background: rgba(0, 0, 0, 0.12);
      position: relative;

      &.on {
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
        font-weight: 600;
        color: rgba(0, 0, 0, 0.4);
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
