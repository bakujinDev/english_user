import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API } from "../../config/api";
import axios from "axios";
import { ReactComponent as I_chk } from "../../asset/icon/I_chk.svg";
import PopupBg from "../../components/common/PopupBg";
import TermPopup from "../../components/common/TermPopup";
import DetailHeader from "../../components/header/DetailHeader";

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [alarm, setAlarm] = useState("");
  const [agreeTerm, setAgreeTerm] = useState(false);
  const [termPopup, setTermPopup] = useState(false);

  function onClickSignupBtn() {
    axios
      .post(API.SIGNUP, { username, pw })
      .then(({ data }) => {
        console.log(data);
        localStorage.setItem("token", data.token);
        navigate("/");
      })
      .catch((err) => {
        console.error(err.response.data.message);
        setAlarm(err.response.data.message);
      });
  }

  useEffect(() => {
    if (!(pw && confirmPw)) return;

    if (pw === confirmPw) setAlarm("");
    else setAlarm("password are not matching");
  }, [pw, confirmPw]);

  return (
    <>
      <DetailHeader />

      <SignupBox>
        <section className="innerSec">
          <button className="logoBtn" onClick={() => navigate("/")}>
            Diana's Class
          </button>

          <ul className="inputList">
            <li>
              <h4 className="key">Name</h4>
              <div className="value">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder=""
                />
              </div>
            </li>

            <li>
              <h4 className="key">Password</h4>
              <div className="value">
                <input
                  type={"password"}
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  placeholder=""
                />
              </div>
            </li>

            <li>
              <h4 className="key">Confirm Password</h4>
              <div className="value">
                <input
                  type={"password"}
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  placeholder=""
                />
              </div>
            </li>

            <li>
              <div className="agreeBox">
                <button
                  className={`${agreeTerm && "on"} chkBox`}
                  onClick={() => setAgreeTerm(!agreeTerm)}
                >
                  {agreeTerm && <I_chk />}
                </button>

                <p>
                  I agree to the{" "}
                  <span
                    className="detailBtn"
                    onClick={() => setTermPopup(true)}
                  >
                    Terms of service
                  </span>
                </p>
              </div>
            </li>
          </ul>

          <div className="btnBox">
            <div>{alarm && <p className="alarm">{alarm}</p>}</div>

            <button
              className="signupBtn"
              disabled={!(username && pw && confirmPw && agreeTerm) || alarm}
              onClick={onClickSignupBtn}
            >
              Signup
            </button>

            <button
              className="loginBtn"
              onClick={() => navigate("/auth/login")}
            >
              Login
            </button>
          </div>
        </section>
      </SignupBox>

      {termPopup && (
        <>
          <TermPopup off={setTermPopup} />
          <PopupBg off={setTermPopup} bg />
        </>
      )}
    </>
  );
}

const SignupBox = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 100px 0 0;
  color: #333;
  overflow-y: scroll;

  .innerSec {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    padding: 0 20px;

    .logoBtn {
      display: flex;
      align-items: center;
      font-size: 28px;
      font-weight: 600;
      font-family: "Edu SA Beginner", cursive;
      color: #fe6c46;
    }

    .inputList {
      display: flex;
      flex-direction: column;
      gap: 24px;
      width: 100%;

      li {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .key {
          font-size: 14px;
          color: #7b849c;
        }

        .value {
          display: flex;
          align-items: center;
          min-height: 48px;
          height: 48px;
          font-weight: 500;
          border: 1px solid #d2d2d7;
          border-radius: 8px;
          overflow: hidden;

          &:focus-within {
            border-color: #fe6c46;
          }

          input {
            flex: 1;
            height: 100%;
            padding: 0 12px;
          }
        }

        .agreeBox {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          font-weight: 500;
          color: #7b849c;

          .chkBox {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 20px;
            height: 20px;
            padding: 2px;
            border: 1px solid #7b849c;
            border-radius: 4px;

            &.on {
              border-color: #fe6c46;

              svg {
                opacity: 1;
              }
            }

            svg {
              width: 100%;
              height: 100%;
              object-fit: contain;
              opacity: 0;
              transition: 0.8s;

              .fill {
                fill: #fe6c46;
              }
            }
          }

          .detailBtn {
            color: #fe6c46;
            text-decoration: underline;
          }
        }
      }
    }

    .btnBox {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      width: 100%;

      .alarm {
        font-size: 14px;
        font-weight: 500;
        color: #ff5353;
      }

      .signupBtn {
        width: 100%;
        height: 44px;
        font-size: 18px;
        font-weight: 500;
        color: #fff;
        background: #fe6c46;
        border-radius: 20px;

        &:disabled {
          color: #fff;
          background: #e6e6ea;
        }
      }

      .loginBtn {
        font-size: 14px;
        font-weight: 500;
        color: #fe6c46;
      }
    }
  }
`;
