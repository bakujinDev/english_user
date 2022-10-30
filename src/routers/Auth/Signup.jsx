import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DefaultHeader from "../../components/header/DefaultHeader";
import { API } from "../../config/api";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [alarm, setAlarm] = useState("");

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
      <DefaultHeader />
      <SignupBox>
        <section className="innerSec">
          <ul className="inputList">
            <li>
              <p className="key">Name</p>
              <div className="value">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder=""
                />
              </div>
            </li>

            <li>
              <p className="key">Password</p>
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
              <p className="key">Confirm Password</p>
              <div className="value">
                <input
                  type={"password"}
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  placeholder=""
                />
              </div>
            </li>
          </ul>

          <div className="btnBox">
            <div>{alarm && <p className="alarm">{alarm}</p>}</div>

            <button
              className="loginBtn"
              disabled={!(username && pw && confirmPw) || alarm}
              onClick={onClickSignupBtn}
            >
              Signup
            </button>

            <button
              className="signupBtn"
              onClick={() => navigate("/auth/login")}
            >
              Login
            </button>
          </div>
        </section>
      </SignupBox>
    </>
  );
}

const SignupBox = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
  overflow-y: scroll;

  .innerSec {
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 100%;

    .inputList {
      display: flex;
      flex-direction: column;
      gap: 24px;

      li {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .key {
          font-size: 16px;
          color: #6d7582;
        }

        .value {
          display: flex;
          align-items: center;
          min-height: 48px;
          font-weight: 600;
          background: #2a2f3b;
          border: 2px solid #484d5a;
          border-radius: 8px;
          overflow: hidden;

          &:focus-within {
            border-color: #7879f1;
          }

          input {
            flex: 1;
            height: 100%;
            padding: 0 12px;
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

      .loginBtn {
        width: 100%;
        height: 44px;
        font-size: 18px;
        font-weight: 500;
        color: #fff;
        background: #7879f1;
        border-radius: 20px;

        &:disabled {
          color: #7b849c;
          background: #2a2f3b;
        }
      }

      .signupBtn {
        font-size: 14px;
        font-weight: 600;
        color: #7879f1;
      }
    }
  }
`;
