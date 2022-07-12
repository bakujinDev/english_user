import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DefaultHeader from "../../components/header/DefaultHeader";

export default function Login() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [pw, setPw] = useState("");

  return (
    <>
      <DefaultHeader />
      <LoginBox>
        <section className="innerSec">
          <ul className="inputList">
            <li>
              <p className="key">Name</p>
              <div className="value">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder=""
                />
              </div>
            </li>

            <li>
              <p className="key">Password</p>
              <div className="value">
                <input
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  placeholder=""
                />
              </div>
            </li>
          </ul>

          <div className="btnBox">
            <button
              className="loginBtn"
              disabled={!(name && pw)}
              onClick={() => {}}
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
    padding: 0 20px;

    .inputList {
      display: flex;
      flex-direction: column;
      gap: 12px;

      li {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .key {
          font-size: 12px;
          color: #6d7582;
        }

        .value {
          display: flex;
          align-items: center;
          min-height: 36px;
          font-weight: 600;
          border: 2px solid #ddd;
          border-radius: 8px;
          overflow: hidden;

          &:focus-within {
            border-color: #7879f1;
          }

          input {
            flex: 1;
            padding: 0 8px;
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

      .loginBtn {
        width: 100%;
        height: 44px;
        font-size: 18px;
        font-weight: 500;
        color: #fff;
        background: #7879f1;
        border-radius: 20px;

        &:disabled {
          background: #d0d0f7;
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
