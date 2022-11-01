import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DefaultHeader from "../components/header/DefaultHeader";
import { useSelector } from "react-redux";
import Banner from "../components/home/Banner";
import WeeklyClass from "../components/home/WeeklyClass";
import Record from "../components/home/Record";
import PhotosReviews from "../components/home/PhotosReviews";
import Instagram from "../components/home/Instagram";
import AboutClass from "../components/home/AboutClass";
import DefaultFooter from "../components/footer/DefaultFooter";

export default function Home() {
  const isMobile = useSelector((state) => state.common.isMobile);

  const navigate = useNavigate();

  if (isMobile)
    return (
      <>
        <DefaultHeader />

        <MainBox>
          <section className="innerSec">
            <Banner />

            <WeeklyClass />

            <Record />

            <PhotosReviews />

            <Instagram />

            <AboutClass />
          </section>
        </MainBox>

        <DefaultFooter />
      </>
    );
  else
    return (
      <>
        <DefaultHeader />

        <PhomeBox>
          <section className="innerSec">
            <Banner />

            <WeeklyClass />

            <Record />

            <PhotosReviews />

            <Instagram />

            <AboutClass />
          </section>
        </PhomeBox>

        <DefaultFooter />
      </>
    );
}

const MainBox = styled.main`
  height: 100%;
  padding: 100px 0 0;
  font-size: 14px;
  overflow-y: scroll;

  .innerSec {
    display: flex;
    flex-direction: column;
    gap: 20px;
    background: #eaeef3;

    .contArea {
      display: flex;
      flex-direction: column;
      gap: 18px;
      padding: 16px 0;
      margin: 0 8px;
      background: #fff;
      border-radius: 8px;
      box-shadow: rgba(99, 99, 99, 0.14) 0px 2px 8px 0px;

      .topBar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;

        .contTitle {
          font-size: 18px;
          font-weight: 700;
        }

        .moreBtn {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 16px;
          line-height: 16px;
          font-weight: 500;

          p {
            padding: 0 0 2px;
          }

          img {
            height: 12px;
          }
        }
      }
    }
  }
`;

const PhomeBox = styled.main`
  padding: 50px 0 0;

  .innerSec {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 110px;
    padding: 0 0 180px;

    .contArea {
      display: flex;
      flex-direction: column;
      gap: 30px;

      .topBar {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .contTitle {
          font-size: 26px;
          font-weight: 700;
        }

        .moreBtn {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 16px;
          line-height: 16px;
          font-weight: 600;

          p {
            padding: 0 0 2px;
          }

          img {
            height: 12px;
          }
        }
      }
    }
  }
`;
