import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import I_rtArw from "../../asset/icon/I_rtArw.svg";

export default function PhotosReviews() {
  const isMobile = useSelector((state) => state.common.isMobile);

  const [reviewList, setreviewList] = useState(new Array(4).fill(""));

  if (isMobile)
    return (
      <MphotosReviewsBox className="contArea">
        <div className="topBar">
          <h2 className="contTitle">Photos & Reviews</h2>

          <button className="moreBtn" onClick={() => {}}>
            <p>more</p>
            <img src={I_rtArw} alt="" />
          </button>
        </div>

        <ul className="reviewList">
          {reviewList.map((v, i) => (
            <li key={i}>
              <div className="imgBox"></div>
              <div className="textBox">
                <p className="review">
                  {`예시입니다
회식 레츠기릿 주말 전체반 회식은 투표중 주말에도 `}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </MphotosReviewsBox>
    );
  else
    return (
      <PphotosReviewsBox className="contArea">
        <div className="topBar">
          <h2 className="contTitle">Photos & Reviews</h2>

          <button className="moreBtn" onClick={() => {}}>
            <p>more</p>
            <img src={I_rtArw} alt="" />
          </button>
        </div>

        <ul className="reviewList">
          {reviewList.map((v, i) => (
            <li key={i}>
              <div className="imgBox"></div>
              <div className="textBox">
                <p className="review">
                  {`예시입니다
회식 레츠기릿 주말 전체반 회식은 투표중 주말에도 `}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </PphotosReviewsBox>
    );
}

const MphotosReviewsBox = styled.article`
  .reviewList {
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

      .textBox {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 20px 16px;

        .review {
          width: 100%;
          font-size: 14px;
          font-weight: 500;
          color: #8e8e8e;
          text-overflow: ellipsis;
          white-space: pre-wrap;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
    }
  }
`;

const PphotosReviewsBox = styled.article`
  width: 1280px;

  .reviewList {
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

      .textBox {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 20px 16px;

        .review {
          width: 100%;
          font-size: 14px;
          font-weight: 500;
          color: #8e8e8e;
          text-overflow: ellipsis;
          white-space: pre-wrap;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
    }
  }
`;
