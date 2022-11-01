import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import I_defaultProfImg_orange from "../../asset/icon/I_defaultProfImg_orange.svg";
import { D_navList } from "../../data/D_header";
import PopupBg from "../common/PopupBg";
import ProfPopup from "./ProfPopup";

export default function DefaultHeader() {
  const navigate = useNavigate();
  const isMobile = useSelector((state) => state.common.isMobile);

  const token = localStorage.getItem("token");

  const [profPopup, setProfPopup] = useState(false);

  if (isMobile)
    return (
      <>
        <MdefaultHeaderBox>
          <section className="headerSec">
            <article className="leftArea">
              <button className="logoBtn" onClick={() => navigate("/")}>
                Diana's Class
              </button>
            </article>

            <article className="rightArea">
              {token ? (
                <span className="profBox">
                  <button
                    className="profBtn"
                    onClick={() => setProfPopup(true)}
                  >
                    <img src={I_defaultProfImg_orange} alt="" />
                  </button>

                  {profPopup && (
                    <>
                      <ProfPopup off={setProfPopup} />
                      <PopupBg off={setProfPopup} />
                    </>
                  )}
                </span>
              ) : (
                <button
                  className="loginBtn"
                  onClick={() => navigate("/auth/login")}
                >
                  LOGIN
                </button>
              )}
            </article>
          </section>

          <section className="navSec">
            <ul className="navList">
              {D_navList.map((v, i) => (
                <li key={i} onClick={() => navigate(v.url)}>
                  <p>{v.text}</p>

                  <span className="bar" />
                </li>
              ))}
            </ul>
          </section>
        </MdefaultHeaderBox>
      </>
    );
  else
    return (
      <>
        <PdefaultHeaderBox>
          <article className="leftArea">
            <button className="logoBtn" onClick={() => navigate("/")}>
              Diana's Class
            </button>

            <ul className="navList">
              {D_navList.map((v, i) => (
                <li key={i} onClick={() => navigate(v.url)}>
                  <p>{v.text}</p>

                  <span className="bar" />
                </li>
              ))}
            </ul>
          </article>

          <article className="rightArea">
            {token ? (
              <span className="profBox">
                <button className="profBtn" onClick={() => setProfPopup(true)}>
                  <img src={I_defaultProfImg_orange} alt="" />
                </button>

                {profPopup && (
                  <>
                    <ProfPopup off={setProfPopup} />
                    <PopupBg off={setProfPopup} />
                  </>
                )}
              </span>
            ) : (
              <button
                className="loginBtn"
                onClick={() => navigate("/auth/login")}
              >
                LOGIN
              </button>
            )}
          </article>
        </PdefaultHeaderBox>
      </>
    );
}

const MdefaultHeaderBox = styled.header`
  color: #fe6c46;
  background: #fff;
  top: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 30;

  .headerSec {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 0 20px;

    .leftArea {
      .logoBtn {
        display: flex;
        align-items: center;
        font-size: 20px;
        font-weight: 600;
        font-family: "Edu SA Beginner", cursive;
      }
    }

    .rightArea {
      .profBox {
        position: relative;

        .profBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 34px;
          height: 34px;
          border: 1px solid #fe6c46;
          border-radius: 50%;
          overflow: hidden;

          img {
            width: 22px;
          }
        }
      }

      .loginBtn {
        width: 94px;
        height: 30px;
        font-size: 14px;
        font-weight: 600;
        border: 1px solid #fe6c46;
        border-radius: 28px;
      }
    }
  }

  .navSec {
    padding: 0 20px;
    color: #fff;
    background: #fe6c46;

    .navList {
      display: flex;
      align-items: center;
      overflow-x: scroll;
      gap: 14px;
      height: 50px;
      font-size: 14px;

      li {
        padding: 4px 0;
        font-weight: 600;
        position: relative;
        cursor: pointer;

        p {
          white-space: nowrap;
        }

        .bar {
          width: 0;
          height: 1px;
          background: #fff;
          bottom: 0;
          position: absolute;
          transition: all 0.4s;
        }
      }
    }
  }
`;

const PdefaultHeaderBox = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 20px;
  color: #fff;
  background: #fe6c46;
  top: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 30;

  .leftArea {
    display: flex;
    align-items: center;
    gap: 20px;

    .logoBtn {
      display: flex;
      align-items: center;
      font-size: 20px;
      font-family: "Edu SA Beginner", cursive;
    }

    .navList {
      display: flex;
      align-items: center;
      gap: 14px;
      font-size: 14px;

      li {
        padding: 4px 0;
        font-weight: 600;
        opacity: 0.6;
        position: relative;
        cursor: pointer;

        .bar {
          width: 0;
          height: 1px;
          background: #fff;
          bottom: 0;
          position: absolute;
          transition: all 0.4s;
        }

        &:hover {
          opacity: 1;

          .bar {
            width: 100%;
          }
        }
      }
    }
  }

  .rightArea {
    .loginBtn {
      width: 124px;
      height: 34px;
      font-size: 14px;
      font-weight: 500;
      color: #fff;
      border: 1px solid #fff;
      border-radius: 28px;

      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    }
  }
`;
