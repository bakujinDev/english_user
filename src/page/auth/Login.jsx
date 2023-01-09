import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DefaultHeader from "../../components/header/DefaultHeader";
import axios from "axios";
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
    localStorage.setItem("token", "token");
    navigate("/");

    // axios
    //   .post(API.LOGIN, { username, pw })
    //   .then(({ data }) => {
    //     console.log(data);
    //     localStorage.setItem("token", data.token);
    //     navigate("/");
    //   })
    //   .catch((err) => {
    //     console.error(err.response.data.message);
    //     setAlarm(err.response.data.message);
    //   });
  }

  useEffect(() => {
    setAlarm("");
  }, [username, pw]);

  return (
    <>
      <DefaultHeader />
      <LoginBox onKeyDown={onKeyDown}>
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
          color: #7b849c;
        }

        input {
          width: 100%;
          height: 48px;
          padding: 0 12px;
          font-weight: 600;
          border: 2px solid #484d5a;
          background: #2a2f3b;
          border-radius: 8px;

          &:focus-within {
            border-color: #7879f1;
          }
        }

        .autoBtn {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #7b849c;

          &.on {
            color: #fff;

            .chkBox {
              border-color: #7879f1;

              svg {
                opacity: 1;
              }
            }
          }

          .chkBox {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 20px;
            height: 20px;
            padding: 2px;
            border: 1px solid #7b849c;
            border-radius: 4px;

            svg {
              width: 100%;
              height: 100%;
              object-fit: contain;
              opacity: 0;
              transition: 0.8s;

              .fill {
                fill: #1f5eff;
              }
            }
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
