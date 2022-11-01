import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DefaultHeader from "../../components/header/DefaultHeader";
import DetailHeader from "../../components/header/DetailHeader";
import { API } from "../../config/api";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [pw, setPw] = useState("");
  const [alarm, setAlarm] = useState("");

  function onKeyDown(e) {
    if (e.key === "Enter") onClickLoginBtn();
  }

  function onClickLoginBtn() {
    axios
      .post(API.LOGIN, { username, pw })
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
    setAlarm("");
  }, [username, pw]);

  return (
    <>
      <DetailHeader />

      <LoginBox onKeyDown={onKeyDown}>
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
          </ul>

          <div className="btnBox">
            <div>{alarm && <p className="alarm">{alarm}</p>}</div>

            <button
              className="loginBtn"
              disabled={!(username && pw) || alarm}
              onClick={onClickLoginBtn}
            >
              Login
            </button>

            <button
              className="signupBtn"
              onClick={() => navigate("/auth/signup")}
            >
              Sign up
            </button>
          </div>
        </section>
      </LoginBox>
    </>
  );
}

const LoginBox = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 100px 0 0 0;
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
        background: #fe6c46;
        border-radius: 20px;

        &:disabled {
          color: #fff;
          background: #e6e6ea;
        }
      }

      .signupBtn {
        font-size: 14px;
        font-weight: 500;
        color: #fe6c46;
      }
    }
  }
`;
