import moment from "moment/moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import I_rtArw from "../../asset/icon/I_rtArw.svg";

export default function WeeklyClass() {
  const isMobile = useSelector((state) => state.common.isMobile);

  const [classList, setClassList] = useState(new Array(4).fill(""));

  if (isMobile)
    return (
      <MweeklyClassBox className="contArea">
        <div className="topBar">
          <h2 className="contTitle">Weekly Class</h2>

          <button className="moreBtn" onClick={() => {}}>
            <p>more</p>
            <img src={I_rtArw} alt="" />
          </button>
        </div>

        <ul className="classList">
          {classList.map((v, i) => (
            <li key={i}>
              <div className="imgBox"></div>
              <div className="infoBox">
                <p className="title">Comming Soon!</p>
                <p className="time">{`${moment().format(
                  `YYYY MM월 `
                )} ${Math.ceil(moment().date() / 7)}주차`}</p>
              </div>
            </li>
          ))}
        </ul>
      </MweeklyClassBox>
    );
  else
    return (
      <PweeklyClassBox className="contArea">
        <div className="topBar">
          <h2 className="contTitle">Weekly Class</h2>

          <button className="moreBtn" onClick={() => {}}>
            <p>more</p>
            <img src={I_rtArw} alt="" />
          </button>
        </div>

        <ul className="classList">
          {classList.map((v, i) => (
            <li key={i}>
              <div className="imgBox"></div>
              <div className="infoBox">
                <p className="title">Comming Soon!</p>
                <p className="time">{`${moment().format(
                  `YYYY MM월 `
                )} ${Math.ceil(moment().date() / 7)}주차`}</p>
              </div>
            </li>
          ))}
        </ul>
      </PweeklyClassBox>
    );
}

const MweeklyClassBox = styled.article`
  .classList {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding: 0 20px;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;

    li {
      min-width: 300px;
      border: 1px solid #dfdfdf;
      border-radius: 14px;
      overflow: hidden;
      cursor: pointer;
      scroll-snap-align: center;
      
      .imgBox {
        height: 300px;
        background: #666;
      }

      .infoBox {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 20px 16px;

        .title {
          font-size: 16px;
          font-weight: 700;
        }

        .time {
          font-size: 14px;
          font-weight: 500;
          color: #8e8e8e;
        }
      }
    }
  }
`;

const PweeklyClassBox = styled.article`
  width: 1280px;

  .classList {
    display: flex;
    justify-content: space-between;
    gap: 20px;

    li {
      width: 300px;
      border: 1px solid #dfdfdf;
      border-radius: 14px;
      overflow: hidden;
      cursor: pointer;

      .imgBox {
        height: 300px;
        background: #666;
      }

      .infoBox {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 20px 16px;

        .title {
          font-size: 16px;
          font-weight: 700;
        }

        .time {
          font-size: 14px;
          font-weight: 500;
          color: #8e8e8e;
        }
      }
    }
  }
`;
