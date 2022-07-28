import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import DetailHeader from "../../components/header/DetailHeader";
import I_mikeWhite from "../../asset/icon/I_mikeWhite.svg";
import I_import from "../../asset/icon/I_import.svg";
import I_play from "../../asset/icon/I_play.svg";
import I_pause from "../../asset/icon/I_pause.svg";
import I_x from "../../asset/icon/I_x.svg";
import moment from "moment";
import WaveSurfer from "wavesurfer.js";

export default function Record() {
  const listRef = useRef();
  const importInputRef = useRef();

  const [stream, setStream] = useState("");
  const [recorder, setRecorder] = useState("");
  const [onRecord, setOnRecord] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [audioList, setAudioList] = useState(new Array(0).fill(""));
  const [waveSurferList, setWaveSurferList] = useState(new Array(0).fill(""));
  const [waveStatusList, setWaveStatusList] = useState(new Array(0).fill(""));

  async function getRecordPermission() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setStream(stream);
    return new MediaRecorder(stream, { type: "audio/mp3" });
  }

  function onClickRecordBtn() {
    if (onRecord) {
      recorder.stop();
      stream.getAudioTracks().forEach((e) => e.stop());
      setStream("");
      setRecorder("");
    } else {
      getRecordPermission().then(setRecorder, (err) => {
        console.error(err);
        // alert("Can't use record environment");
      });
    }

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
    waveSurferList[i].playPause();
  }

  function getAudioQuery() {
    if (!audioList.length) return;

    setTimeout(() => setWaveStatusList([...waveSurferList]), 1);
  }

  function getAudioTime({ i, type }) {
    let currentTime = waveStatusList[i]?.getCurrentTime() || 0;
    let duration = waveStatusList[i]?.getDuration() || 0;

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

  function markUpWave() {
    let _waveBox = document.getElementById(`waveBox${audioList.length - 1}`);
    let _audioQueryList = waveSurferList;

    const waveSurfer = WaveSurfer.create({
      container: _waveBox,
      barWidth: 1,
      cursorColor: " #7879f1",
      progressColor: " #7879f1",
      scrollParent: true,
    });

    waveSurfer.load(audioList[audioList.length - 1].data);

    waveSurfer.on("ready", () => {
      _audioQueryList[audioList.length - 1] = waveSurfer;
      setWaveSurferList([..._audioQueryList]);
    });
  }

  function onClickDelBtn(i) {
    let _audioList = audioList;
    let _waveSurferList = waveSurferList;

    _audioList = audioList.filter((e, index) => index !== i);
    _waveSurferList = waveSurferList.filter((e, index) => index !== i);

    let _waveBox = document.getElementById(`waveBox${i}`);
    _waveBox.removeChild(_waveBox.firstElementChild);

    waveSurferList[i].destroy();

    setAudioList([..._audioList]);
    setWaveSurferList([..._waveSurferList]);
    setWaveStatusList([..._waveSurferList]);
  }

  useEffect(async () => {
    if (!recorder) return;

    await recorder.addEventListener("dataavailable", handleData);
    recorder.start();
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder]);

  useEffect(() => {
    if (!audioList) return;

    let _audioList = [...audioList, audioUrl];
    _audioList = _audioList.filter((e) => e);

    setAudioList([..._audioList]);
  }, [audioUrl]);

  useEffect(() => {
    if (!audioList.length) return;
    // 삭제할때 기존에 있던거 유지됨 이거떄문일꺼임 length 통과되니깐

    markUpWave();

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
              <details
                key={i}
                open={waveStatusList[i] && waveStatusList[i]?.isPlaying()}
                className={`${
                  waveStatusList[i] &&
                  waveStatusList[i]?.isPlaying() &&
                  "playing"
                }`}
              >
                <summary>
                  <div className="summaryCont">
                    <div className="leftBox">
                      <button
                        id={`actionBtn${i}`}
                        className={`actionBtn`}
                        onClick={() => onClickActionBtn(i)}
                      >
                        <img
                          className="iPlay"
                          src={
                            waveStatusList[i]?.isPlaying() ? I_pause : I_play
                          }
                          alt=""
                        />
                      </button>

                      <div className="contBox">
                        <div className="topBar">
                          <p className="time">{v.createdTime}</p>
                        </div>

                        <div className="contBar">
                          <p className="progress">
                            <span className="current">
                              {getAudioTime({ i, type: "current" })}
                            </span>
                            ~{getAudioTime({ i, type: "duration" })}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rightBox">
                      <button
                        className="delBtn"
                        onClick={() => onClickDelBtn(i)}
                      >
                        <img src={I_x} alt="" />
                      </button>
                    </div>
                  </div>
                </summary>

                <div className="openBox">
                  <div id={`waveBox${i}`}></div>
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

        &.playing {
          summary {
            .summaryCont {
              .leftBox {
                .contBox {
                  .contBar {
                    .progress {
                      .current {
                        font-weight: 500;
                        color: #7879f1;
                      }
                    }
                  }
                }
              }
            }
          }
        }

        summary {
          padding: 4px 20px;

          .summaryCont {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 52px;

            .leftBox {
              display: flex;
              align-items: center;
              gap: 8px;

              .actionBtn {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 32px;
                aspect-ratio: 1;
                padding: 4px;
                border-radius: 50%;
                box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

                img {
                  height: 18px;
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
            }
          }
        }

        .openBox {
          padding: 4px 20px;
          background: #eee;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 5px 10px -12px inset,
            rgba(0, 0, 0, 0.3) 0px 6px 12px -6px inset;
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
