import { useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

export default function Banner() {
  const bannerRef = useRef();
  const indexRef = useRef();
  const timeOutRef = useRef();
  const isMobile = useSelector((state) => state.common.isMobile);

  const [bannerList, setBannerList] = useState(new Array(4).fill(""));
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    timeOutRef.current = setInterval(() => {
      if (bannerIndex + 1 >= bannerList.length) {
        setBannerIndex(0);
        indexRef.current = 0;
      } else {
        setBannerIndex(bannerIndex + 1);
        indexRef.current = bannerIndex + 1;
      }
    }, [1000]);

    return () => clearInterval(timeOutRef.current);
  }, []);

  useEffect(() => {
    if (!bannerRef.current) return;

    const contWidth = bannerRef.current.children[0].offsetWidth;
    indexRef.current = bannerIndex;

    bannerRef.current.scrollTo({
      left: contWidth * bannerIndex,
      behavior: "smooth",
    });

    if (timeOutRef.current) clearInterval(timeOutRef.current);

    timeOutRef.current = setInterval(() => {
      if (bannerIndex + 1 >= bannerList.length) {
        setBannerIndex(0);
        indexRef.current = 0;
      } else {
        setBannerIndex(bannerIndex + 1);
        indexRef.current = bannerIndex + 1;
      }
    }, [5000]);
  }, [bannerIndex]);

  if (isMobile)
    return (
      <MbannerBox>
        <ul className="bannerList" ref={bannerRef}>
          {bannerList.map((v, i) => (
            <li key={i}>{v}</li>
          ))}
        </ul>

        <ul className="indexList">
          {bannerList.map((v, i) => (
            <li
              key={i}
              className={`${i === bannerIndex ? "on" : ""}`}
              onClick={() => setBannerIndex(i)}
            >
              {v}
            </li>
          ))}
        </ul>
      </MbannerBox>
    );
  else
    return (
      <PbannerBox>
        <ul className="bannerList" ref={bannerRef}>
          {bannerList.map((v, i) => (
            <li key={i}>{v}</li>
          ))}
        </ul>

        <ul className="indexList">
          {bannerList.map((v, i) => (
            <li
              key={i}
              className={`${i === bannerIndex ? "on" : ""}`}
              onClick={() => setBannerIndex(i)}
            >
              {v}
            </li>
          ))}
        </ul>
      </PbannerBox>
    );
}

const MbannerBox = styled.article`
  width: 100%;
  position: relative;

  .bannerList {
    display: flex;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;

    li {
      width: 100vw;
      min-width: 100vw;
      height: 400px;
      scroll-snap-align: center;

      &:nth-of-type(1) {
        background: #c65d7b;
      }

      &:nth-of-type(2) {
        background: #874356;
      }

      &:nth-of-type(3) {
        background: #f68989;
      }

      &:nth-of-type(4) {
        background: #f6e7d8;
      }
    }
  }

  .indexList {
    display: flex;
    align-content: center;
    gap: 14px;
    padding: 8px 12px;
    left: 50%;
    bottom: 18px;
    position: absolute;
    transform: translate(-50%, 0);

    li {
      width: 30px;
      height: 4px;
      opacity: 0.3;
      background: #fff;
      border-radius: 20px;
      cursor: pointer;

      &.on {
        background: #fff;
        opacity: 1;
      }
    }
  }
`;

const PbannerBox = styled.article`
  width: 100%;
  position: relative;

  .bannerList {
    display: flex;
    overflow-x: scroll;

    & > li {
      width: 100vw;
      min-width: 100vw;
      height: 500px;

      &:nth-of-type(1) {
        background: #c65d7b;
      }

      &:nth-of-type(2) {
        background: #874356;
      }

      &:nth-of-type(3) {
        background: #f68989;
      }

      &:nth-of-type(4) {
        background: #f6e7d8;
      }
    }
  }

  .indexList {
    display: flex;
    align-content: center;
    gap: 14px;
    padding: 8px 12px;
    left: 50%;
    bottom: 18px;
    position: absolute;
    transform: translate(-50%, 0);

    li {
      width: 30px;
      height: 4px;
      opacity: 0.3;
      background: #fff;
      border-radius: 20px;
      cursor: pointer;

      &.on {
        background: #fff;
        opacity: 1;
      }
    }
  }
`;
