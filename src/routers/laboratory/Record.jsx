import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import DetailHeader from "../../components/header/DetailHeader";
import I_mikeWhite from "../../asset/icon/I_mikeWhite.svg";
import I_import from "../../asset/icon/I_import.svg";
import I_play from "../../asset/icon/I_play.svg";
import I_pause from "../../asset/icon/I_pause.svg";
import moment from "moment";

export default function Record() {
  const listRef = useRef();
  const importInputRef = useRef();

  const [recorder, setRecorder] = useState("");
  const [onRecord, setOnRecord] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [audioList, setAudioList] = useState(new Array(0).fill(""));
  const [audioQueryList, setAudioQueryList] = useState(new Array(0).fill(""));

  async function getRecordPermission() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return new MediaRecorder(stream, { type: "audio/mp3" });
  }

  function onClickRecordBtn() {
    setOnRecord(!onRecord);
  }

  function handleData(e) {
    setAudioUrl({
      data: URL.createObjectURL(e.data),
      createdTime: moment(new Date()).format("HH:mm:ss"),
    });
  }

  function onChangeImport(e) {
    const reader = new FileReader();

    reader.onloadend = (e) => {
      const result = e.target.result;

      setAudioUrl({
        data: result,
        createdTime: moment(new Date()).format("HH:mm:ss"),
      });
    };

    reader.readAsDataURL(e.target.files[0]);
  }

  function onClickActionBtn(i) {
    if (audioList[i].status === "play") audioQueryList[i].pause();
    else audioQueryList[i].play();
  }

  function getAudioQuery() {
    if (!audioList.length) return;

    let _children = Object.values(listRef.current.children);
    let _audioQueryList = _children.map((e) => e.querySelector("audio"));

    setTimeout(() => setAudioQueryList([..._audioQueryList]), 1);
  }

  function getAudioTime({ i, type }) {
    let currentTime = audioQueryList[i]?.currentTime || 0;
    let duration = audioQueryList[i]?.duration || 0;

    switch (type) {
      case "current":
        return `${`${Math.floor(currentTime / 60)}`.padStart(
          2,
          "0"
        )}:${`${Math.floor(currentTime % 60)}`.padStart(2, "0")}`;

      case "duration":
        return `${`${Math.floor(duration / 60)}`.padStart(
          2,
          "0"
        )}:${`${Math.ceil(duration % 60)}`.padStart(2, "0")}`;

      default:
        break;
    }
  }

  function onEventAudio({ i, type }) {
    let _audioList = audioList;

    _audioList[i].status = type;

    setAudioList([..._audioList]);
  }

  function getRangeValue(i) {
    let _audioList = audioList;

    let _time = Math.floor(
      (audioQueryList[i]?.currentTime * 100) / audioQueryList[i]?.duration
    );

    _audioList[i].currentTime = _time;

    setAudioList([..._audioList]);
  }

  useEffect(() => {
    if (!recorder) return;

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder]);

  useEffect(() => {
    if (!recorder) {
      getRecordPermission().then(setRecorder, (err) => {
        console.error(err);
        // alert("Can't use record environment");
      });

      return;
    }

    if (onRecord) recorder.start();
    else if (recorder.state !== "inactive") recorder.stop();
  }, [recorder, onRecord]);

  useEffect(() => {
    if (!audioList) return;

    let _audioList = [...audioList, audioUrl];
    _audioList = _audioList.filter((e) => e);

    setAudioList([..._audioList]);
  }, [audioUrl]);

  useEffect(() => {
    let _interval = setInterval(getAudioQuery, 500);

    return () => {
      clearInterval(_interval);
    };
  }, [audioList]);

  return (
    <>
      <DetailHeader title="record" />

      <RecordBox>
        <article className="contArea">
          <div className="topBar">
            <p className="title">record list</p>

            <div className="importBox">
              <button
                className="importBtn"
                onClick={() => importInputRef.current.click()}
              >
                <img src={I_import} alt="" />
              </button>

              <input
                ref={importInputRef}
                type={"file"}
                onChange={onChangeImport}
                accept="audio/*"
                placeholder=""
              />
            </div>
          </div>

          <ul className="audioList" ref={listRef}>
            {audioList.map((v, i) => (
              <details key={i}>
                <summary>
                  <div className="summaryCont">
                    <button
                      className={`${v.status} actionBtn`}
                      onClick={() => onClickActionBtn(i)}
                    >
                      <img className="iPlay" src={I_play} alt="" />
                      <img className="iPause" src={I_pause} alt="" />
                    </button>

                    <div className="contBox">
                      <div className="topBar">
                        <p className="time">{v.createdTime}</p>
                      </div>

                      <div className="contBar">
                        <p className="progress">
                          {getAudioTime({ i, type: "current" })}~
                          {getAudioTime({ i, type: "duration" })}
                        </p>
                      </div>
                    </div>

                    <audio
                      id={`audio${i}`}
                      onPlay={() => onEventAudio({ i, type: "play" })}
                      onPause={() => onEventAudio({ i, type: "pause" })}
                      onEnded={() => onEventAudio({ i, type: "ended" })}
                      src={v.data}
                      controls
                      type="audio/mp3"
                    />
                  </div>
                </summary>

                <div className="openBox">
                  <input
                    type="range"
                    value={audioList[i].currentTime}
                    onChange={() => getRangeValue(i)}
                    max="100"
                  />
                  <input />
                </div>
              </details>
            ))}
          </ul>
        </article>

        <button
          className={`${onRecord ? "on" : ""} recordBtn`}
          onClick={onClickRecordBtn}
        >
          <img src={I_mikeWhite} alt="" />
        </button>
      </RecordBox>
    </>
  );
}

const RecordBox = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  padding: 50px 0 60px;
  overflow: hidden;

  .contArea {
    flex: 1;
    overflow-y: scroll;

    & > .topBar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      padding: 0 20px;

      .title {
        font-size: 20px;
        font-weight: 600;
        color: #353535;
      }

      .importBox {
        position: relative;

        .importBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 32px;
          aspect-ratio: 1;
          padding: 8px 8px 8px 10px;
          border-radius: 50%;
          background: #f9f9f9;

          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }

        input {
          width: 0;
          height: 0;
          position: absolute;
        }
      }
    }

    .audioList {
      details {
        border-top: 1px solid #eee;

        summary {
          padding: 4px 20px;

          .summaryCont {
            display: flex;
            align-items: center;
            gap: 8px;
            height: 52px;

            .actionBtn {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 32px;
              aspect-ratio: 1;
              padding: 4px;
              border-radius: 50%;
              box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

              &.play {
                .iPlay {
                  display: none;
                }

                .iPause {
                  display: block;
                }
              }

              img {
                height: 18px;
                transition: all 0.4s;

                &.iPlay {
                  display: block;
                }

                &.iPause {
                  display: none;
                }
              }
            }

            .contBox {
              .topBar {
                .time {
                  font-size: 14px;
                  font-weight: 500;
                  color: #666;
                }
              }

              .contBar {
                font-size: 14px;
                color: #aaa;
              }
            }

            audio {
              width: 0;
              height: 0;
            }
          }
        }

        .openBox {
          background: #ccc;
        }
      }

      li {
        display: flex;
        flex-direction: column;
        padding: 4px 0;
        border-top: 1px solid #eee;

        &:focus-within {
          background: #e4e4fc;

          audio {
            &::-webkit-media-controls-panel {
              background: #e4e4fc;
            }
          }
        }

        .time {
          padding: 0 20px;
          font-size: 14px;
          font-weight: 500;
          color: #666;
        }

        audio {
          width: 100%;
          height: 40px;
          border-radius: 0;

          &::-webkit-media-controls-panel {
            background: #fff;
          }
        }
      }
    }
  }

  .recordBtn {
    width: 100%;
    height: 60px;
    min-height: 60px;
    padding: 10px;
    background: #7879f1;
    right: 0;
    bottom: 0;
    left: 0;
    position: fixed;

    &.on {
      background: #ff5353;
    }

    img {
      height: 100%;
    }
  }
`;
