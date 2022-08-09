import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

export default function Loader() {
  const delay = 0.5;
  const aniStep = 12;

  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    if (trigger) {
      setTimeout(() => {
        setTrigger(false);
      }, delay * aniStep * 1000 + 2000);
    } else {
      setTimeout(() => {
        setTrigger(true);
      }, 1000);
    }
  }, [trigger]);

  return (
    <LoaderBox >
      {trigger && (
        <svg width="370" height="160" viewBox="0 0 370 160">
          <text x="0" y="50%">
            D
          </text>
          <text x="34" y="50%">
            I
          </text>
          <text x="46" y="50%">
            A
          </text>
          <text x="80" y="50%">
            N
          </text>
          <text x="114" y="50%">
            A
          </text>
          <text x="170" y="50%">
            E
          </text>
          <text x="196" y="50%">
            N
          </text>
          <text x="230" y="50%">
            G
          </text>
          <text x="266" y="50%">
            L
          </text>
          <text x="292" y="50%">
            I
          </text>
          <text x="306" y="50%">
            S
          </text>
          <text x="336" y="50%">
            H
          </text>
        </svg>
      )}
    </LoaderBox>
  );
}

const textAni = keyframes`
  0%   {
    stroke:#7879f1;
    stroke-width: 3px;
    stroke-dashoffset: 326px;
  }
  70% {
    fill: transparent;
  }
  98% {
    stroke:#7879f1;
    stroke-width: 0.4px;
  }
  100% {
    fill: #7879f1;
    stroke-dashoffset: 0px;
  }
`;

const disapearAni = keyframes`
0%{
  opacity: 1;
}
100%{
  opacity: 0;
}
`;

const LoaderBox = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  background: #2a2f3b;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;

  svg {
    width: 100%;
    animation: ${disapearAni} 0.8s 6.4s linear;
    animation-fill-mode: forwards;

    text {
      font-size: 48px;
      font-weight: 700;
      fill: transparent;
      stroke-width: 0.4px;
      stroke-dasharray: 326px;
      animation: ${textAni} 1s linear;
      animation-fill-mode: forwards;

      &:nth-child(1) {
        animation-delay: 0s;
      }
      &:nth-child(2) {
        animation-delay: 0.5s;
      }
      &:nth-child(3) {
        animation-delay: 1s;
      }
      &:nth-child(4) {
        animation-delay: 1.5s;
      }
      &:nth-child(5) {
        animation-delay: 2s;
      }
      &:nth-child(6) {
        animation-delay: 2.5s;
      }
      &:nth-child(7) {
        animation-delay: 3s;
      }
      &:nth-child(8) {
        animation-delay: 3.5s;
      }
      &:nth-child(9) {
        animation-delay: 4s;
      }
      &:nth-child(10) {
        animation-delay: 4.5s;
      }
      &:nth-child(11) {
        animation-delay: 5s;
      }
      &:nth-child(12) {
        animation-delay: 5.5s;
      }
    }
  }
`;
