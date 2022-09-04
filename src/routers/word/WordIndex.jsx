import styled from "styled-components";
import DetailHeader from "../../components/header/DetailHeader";
import I_rtArw from "../../asset/icon/I_rtArw.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../../config/api";
import axios from "axios";

export default function WordIndex() {
  const navigate = useNavigate();

  const [listData, setListData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API.DATA_LIST}/weekly_word/10/0`)
      .then(({ data }) => {
        console.log(data);
        setListData(data.resData.dbData);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <DetailHeader title="Word" />

      <WordIndexBox>
        <nav className="navList">
          {listData.map((v, i) => (
            <button key={i} onClick={() => navigate(`${v.id + 1}`)}>
              <p>{v.name}</p>

              <img src={I_rtArw} alt="" />
            </button>
          ))}
        </nav>
      </WordIndexBox>
    </>
  );
}

const WordIndexBox = styled.main`
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
      color: #7b849c;
      border-bottom: 1px solid #353c49;
    }
  }
`;
