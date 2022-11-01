import moment from "moment/moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

export default function Record() {
  const isMobile = useSelector((state) => state.common.isMobile);

  const [recordList, setRecordList] = useState([1, 2, 3, 4]);

  if (isMobile)
    return (
      <MrecordBox className="contArea">
        <div className="topBar">
          <h2 className="contTitle">Record</h2>
        </div>

        <ul className="recordList">
          {recordList.map((v, i) => (
            <li key={i}>{moment().format("YYYY/MM/DD HH:mm:ss")}</li>
          ))}
        </ul>
      </MrecordBox>
    );
  else
    return (
      <PrecordBox className="contArea">
        <div className="topBar">
          <h2 className="contTitle">Record</h2>
        </div>

        <ul className="recordList">
          {recordList.map((v, i) => (
            <li key={i}>{moment().format("YYYY/MM/DD HH:mm:ss")}</li>
          ))}
        </ul>
      </PrecordBox>
    );
}

const MrecordBox = styled.article`
  .recordList {
    margin: 0 20px;
    background: #f3f5f7;
    border-radius: 8px;

    li {
      display: flex;
      align-items: center;
      height: 40px;
      font-weight: 500;
      padding: 0 14px;
      border-bottom: 1px solid #dfdfdf;
    }
  }
`;

const PrecordBox = styled.article`
  width: 1280px;

  .recordList {
    background: #f3f5f7;
    border-radius: 8px;

    li {
      display: flex;
      align-items: center;
      height: 40px;
      font-weight: 500;
      padding: 0 14px;
      border-bottom: 1px solid #dfdfdf;
    }
  }
`;
