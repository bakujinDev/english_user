import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import I_speaker from "../../asset/icon/I_speaker.svg";
import { ReactComponent as I_x } from "../../asset/icon/I_x.svg";

export default function WordList({ category, wordObj }) {
  const [delWordList, setDelWordList] = useState([]);
  const [disVisbleKey, setDisVisbleKey] = useState(false);
  const [disVisbleVal, setDisVisbleVal] = useState(false);

  async function getDelWordListByStorage() {
    let _delWordList = await JSON.parse(localStorage.getItem(wordObj.name));

    if (_delWordList) setDelWordList([..._delWordList]);
  }

  function onClickSpeak(text) {
    window.responsiveVoice.enableEstimationTimeout = false;
    window.responsiveVoice.speak(text);
  }

  function onClickDelBtn(id) {
    let _delWordList = delWordList;

    if (_delWordList.includes(id))
      _delWordList = _delWordList.filter((v) => v !== id);
    else _delWordList.push(id);

    setDelWordList([..._delWordList]);
    localStorage.setItem(wordObj.name, JSON.stringify(_delWordList));
  }

  useEffect(() => {
    getDelWordListByStorage();
  }, [localStorage.getItem(wordObj.name)]);

  return (
    <PwordListBox>
      <ul className="wordList">
        {wordObj.value?.map((v, i) =>
          category
            ? delWordList?.includes(v.id) && (
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

                  <button
                    className={`delBtn`}
                    onClick={() => onClickDelBtn(v.id)}
                  >
                    <I_x />
                  </button>
                </li>
              )
            : !delWordList?.includes(v.id) && (
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

                  <button
                    className={`delBtn`}
                    onClick={() => onClickDelBtn(v.id)}
                  >
                    <I_x />
                  </button>
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
        border-top: 1px solid #7b849c;
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
            color: #97a2bf;
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

          .fill {
            fill: #666;
          }
        }
      }
    }
  }
`;
