import styled from "styled-components";
import DetailHeader from "../../components/header/DetailHeader";
import { ReactComponent as I_rtArw } from "../../asset/icon/I_rtArw.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../../config/api";
import axios from "axios";
import { D_weeklyWordList } from "../../data/D_word";

export default function WordIndex() {
  const navigate = useNavigate();

  const [listData, setListData] = useState([]);

  function getData() {
    axios
      .get(`${API.DATA_LIST}/weekly_word/10/0`)
      .then(({ data }) => {
        console.log(data);
        setListData(data.resData.dbData);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    // getData();
  }, []);

  return (
    <>
      <DetailHeader title="Word" />

      <WordIndexBox>
        <nav className="navList">
          {D_weeklyWordList.map((v, i) => (
            <li key={i} onClick={() => navigate(`${v.id + 1}`)}>
              <p>{v.name}</p>

              <I_rtArw />
            </li>
          ))}
        </nav>
      </WordIndexBox>
    </>
  );
}

const WordIndexBox = styled.main`
  padding: 50px 0 0;

  .navList {
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      padding: 0 20px;
      border-bottom: 1px solid #353c49;
      cursor: pointer;

      p {
        font-size: 18px;
        font-weight: 500;
        color: #7b849c;
      }

      svg {
        .fill {
          fill: #7b849c;
        }
      }
    }
  }
`;
