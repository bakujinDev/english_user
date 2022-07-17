import { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as I_x } from "../../asset/icon/I_x.svg";
import I_speaker from "../../asset/icon/I_speaker.svg";

export default function WordList({ listData }) {
  const locData = JSON.parse(localStorage.getItem("delWord"));

  const [disVisbleKey, setDisVisbleKey] = useState(false);
  const [disVisbleVal, setDisVisbleVal] = useState(false);

  useEffect(() => {
    // if (locData) setDelList(locData);
  }, []);

  async function onClickSpeak(text) {
    window.responsiveVoice.enableEstimationTimeout = false;
    window.responsiveVoice.speak(text);
  }

  function onClickDelBtn(id) {
    // let delArray = [];
    // if (locData) delArray = locData;
    // if (delArray.indexOf(id) === -1) {
    //   delArray.push(id);
    //   localStorage.setItem("delWord", JSON.stringify(delArray));
    //   setDelList([...delArray]);
    // }
  }

  return (
    <PwordListBox>
      <ul className="wordList">
        {listData.map(
          (v, i) =>
            listData?.indexOf(v.id) === -1 && (
              <li key={i}>
                <div className="contBox">
                  <div className="keyBox">
                    <button
                      className={`${disVisbleKey && "disVisble"} key textBtn`}
                      onClick={() => setDisVisbleKey(!disVisbleKey)}
                    >
                      <p>{v.word}</p>
                    </button>

                    <button
                      className="speakBtn"
                      onClick={() => onClickSpeak(v.word)}
                    >
                      <img src={I_speaker} alt="" />
                    </button>
                  </div>

                  <button
                    className={`${disVisbleVal && "disVisble"} value textBtn`}
                    onClick={() => setDisVisbleVal(!disVisbleVal)}
                  >
                    <p>{v.meaning}</p>
                  </button>
                </div>

                {/* <button
                  className={`delBtn`}
                  onClick={() => onClickDelBtn(v.id)}
                >
                  <I_x />
                </button> */}
              </li>
            )
        )}
      </ul>
    </PwordListBox>
  );
}

const PwordListBox = styled.section`
  padding: 0 14px;

  .wordList {
    display: flex;
    flex-direction: column;

    li {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 20px;
      padding: 6px 0;

      &:nth-of-type(n + 2) {
        border-top: 1px solid rgba(0, 0, 0, 0.1);
      }

      .contBox {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;

        .textBtn {
          display: flex;
          align-items: center;
          transition: 0.4s;
          font-size: 16px;
          font-weight: 600;

          &.value {
            color: #999;
          }

          &.disVisble {
            opacity: 0;
          }
        }

        .keyBox {
          display: flex;
          align-items: center;
          gap: 10px;

          .speakBtn {
            display: flex;
            align-items: center;

            img {
              height: 14px;
            }
          }
        }
      }

      .delBtn {
        display: flex;
        align-items: center;

        svg {
          width: 14px;
          height: 14px;

          .stroke {
            stroke: #666;
          }
        }
      }
    }
  }
`;
