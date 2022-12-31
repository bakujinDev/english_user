import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import DetailHeader from "../../components/header/DetailHeader";
import I_mikeWhite from "../../asset/icon/I_mikeWhite.svg";
import { ReactComponent as I_import } from "../../asset/icon/I_import.svg";
import { ReactComponent as I_x } from "../../asset/icon/I_x.svg";
import { ReactComponent as I_play } from "../../asset/icon/I_play.svg";
import { ReactComponent as I_pause } from "../../asset/icon/I_pause.svg";
import WaveSurfer from "wavesurfer.js";
import axios from "axios";
import { API } from "../../config/api";
import AlertPopup from "../../components/common/AlertPopup";
import PopupBg from "../../components/common/PopupBg";
import { useNavigate } from "react-router-dom";
import LoadingBar from "../../components/common/LoadingBar";

export default function Create() {
  const importInputRef = useRef();
  const waveRef = useRef();
  const recordTimeRef = useRef(0);
  const timeInterval = useRef(null);
  const navigate = useNavigate();

  const [recorder, setRecorder] = useState("");
  const [loader, setLoader] = useState(false);
  const [onRecord, setOnRecord] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState("");
  const [waveStatus, setWaveStatus] = useState("");
  const [alertPopup, setAlertPopup] = useState(false);
  const [uploadBusy, setUploadBusy] = useState(false);

  async function getRecordPermission() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return new MediaRecorder(stream, { type: "audio/mp3" });
  }

  function handleData(e) {
    var reader = new FileReader();

    reader.onloadend = function () {
      console.log(reader.result);
      setAudioUrl({
        data: reader.result,
      });
    };
    reader.readAsDataURL(e.data);
  }

  function onChangeImport(e) {
    const reader = new FileReader();

    reader.onloadend = (data) => {
      const result = data.target.result;
      setAudioUrl({
        data: result,
      });

      e.target.value = "";
    };

    reader.readAsDataURL(e.target.files[0]);
  }

  function onClickRecordBtn() {
    setOnRecord(!onRecord);
  }

  function onClickActionBtn() {
    waveRef.current.playPause();
  }

  /**
   * 녹화중일때 녹화시간 타이머
   */
  function timerOnRecord() {
    if (onRecord) {
      timeInterval.current = setInterval(() => {
        recordTimeRef.current += 1;
        setRecordTime(recordTimeRef.current);
      }, 1000);
    } else {
      if (timeInterval.current) {
        clearInterval(clearInterval(timeInterval.current));
        timeInterval.current = null;
      }
    }
  }

  function getAudioQuery() {
    setTimeout(() => {
      setWaveStatus({
        isPlaying: waveRef.current.isPlaying(),
        currentTime: waveRef.current.getCurrentTime(),
        duration: waveRef.current.getDuration(),
      });
    }, 1);
  }

  function getAudioTime(type) {
    let currentTime = (waveStatus && waveStatus.currentTime) || 0;
    let duration = (waveStatus && waveStatus.duration) || 0;

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
    let _waveBox = document.getElementById(`waveBox`);

    const waveSurfer = WaveSurfer.create({
      container: _waveBox,
      barWidth: 1,
      cursorColor: " #7879f1",
      progressColor: " #7879f1",
      scrollParent: true,
      backgroundColor: "#323741",
    });

    waveSurfer.load(audioUrl.data);

    waveSurfer.on("ready", () => {
      waveRef.current = waveSurfer;
    });
  }

  function onClickSubmitBtn() {
    setUploadBusy(true);

    axios
      .post(API.RECORD, {
        data: audioUrl.data,
      })
      .then((res) => {
        console.log(res);
        setAlertPopup("Submit Complete");
        setUploadBusy(false);
      })
      .catch(console.error);
  }

  function onClickDelBtn() {
    waveRef.current.destroy();
    setAudioUrl("");
    setWaveStatus("");
    setOnRecord(false);
    recordTimeRef.current = 0;
    setRecordTime(0);
  }

  useEffect(() => {
    return () => {
      sessionStorage.setItem("reload", true);
    };
  }, []);

  useEffect(() => {
    if (!recorder) return;

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder]);

  useEffect(() => {
    timerOnRecord();

    return () => {
      if (timeInterval.current) {
        clearInterval(clearInterval(timeInterval.current));
        timeInterval.current = null;
      }
    };
  }, [onRecord]);

  useEffect(() => {
    if (!recorder) {
      getRecordPermission().then(
        (res) => {
          setRecorder(res);
          setLoader(true);
        },
        (err) => {
          console.error(err);
        }
      );

      return;
    }

    if (onRecord) recorder.start();
    else if (recorder.state !== "inactive") recorder.stop();
  }, [recorder, onRecord]);

  useEffect(() => {
    if (!audioUrl) return;
    markUpWave();
  }, [audioUrl]);

  useEffect(() => {
    if (!waveRef) return;

    let _interval = setInterval(getAudioQuery, 500);

    return () => {
      clearInterval(_interval);
    };
  }, [waveRef]);

  useEffect(() => {
    if (!loader) return;

    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, [loader]);

  console.log(recordTimeRef.current);

  return (
    <>
      <DetailHeader title="Record" />

      <CreateBox>
        <section className="innerBox">
          <article className="topArea">
            <button
              className="importBtn"
              onClick={() => importInputRef.current.click()}
            >
              <I_import />

              <input
                ref={importInputRef}
                type={"file"}
                onChange={onChangeImport}
                accept="audio/*"
              />
            </button>
          </article>

          <article className="contArea">
            <div className="waveCont">
              <div id="waveBox" className="waveBox"></div>

              <p className="progress">
                <span className={`${waveStatus.currentTime && "current"}`}>
                  {getAudioTime("current")}
                </span>
                ~
                {onRecord ? (
                  <span className={`record total`}>
                    {`${String(Math.floor(recordTime / 60)).padStart(
                      2,
                      "0"
                    )}:${String(recordTime % 60).padStart(2, "0")}`}
                  </span>
                ) : (
                  <span className={`total`}>{getAudioTime("duration")}</span>
                )}
              </p>
            </div>
          </article>
        </section>

        <div className="btnBox">
          {audioUrl ? (
            <>
              <button className={`playPauseBtn`} onClick={onClickActionBtn}>
                {waveStatus && waveStatus?.isPlaying ? <I_pause /> : <I_play />}
              </button>

              <button
                className="submitBtn"
                disabled={uploadBusy}
                onClick={onClickSubmitBtn}
              >
                Submit
              </button>

              <button className="delBtn" onClick={onClickDelBtn}>
                <I_x />
              </button>
            </>
          ) : (
            <button
              className={`${onRecord ? "on" : ""} recordBtn`}
              onClick={onClickRecordBtn}
            >
              <img src={I_mikeWhite} alt="" />
            </button>
          )}
        </div>
      </CreateBox>

      {loader && <LoadingBar />}

      {alertPopup && (
        <>
          <AlertPopup
            cont={alertPopup}
            off={() => {
              setAlertPopup();
              navigate(-1);
            }}
          />
          <PopupBg
            bg
            off={() => {
              setAlertPopup();
              navigate(-1);
            }}
          />
        </>
      )}
    </>
  );
}

const CreateBox = styled.main`
  height: 100%;
  padding: 50px 0 0;
  background: #2a2f3b;

  .innerBox {
    display: flex;
    flex-direction: column;
    height: 100%;

    .topArea {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 50px;
      padding: 0 14px;

      .importBtn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        padding: 8px 8px 8px 10px;
        border-radius: 50%;
        background: #323741;
        position: relative;

        svg {
          width: 100%;
          height: 100%;
          object-fit: contain;

          .fill {
            fill: #7b849c;
          }
        }

        input {
          width: 0;
          height: 0;
          position: absolute;
        }
      }
    }

    .contArea {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 0 20px 50px;

      .waveCont {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .waveBox {
          width: 100%;
          min-height: 128px;
          background: #eee;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 5px 10px -12px inset,
            rgba(0, 0, 0, 0.3) 0px 6px 12px -6px inset;
        }

        .progress {
          display: flex;
          justify-content: flex-end;
          color: #7b849c;

          .current {
            font-weight: 500;
            color: #fff;
          }

          .total {
            &.record {
              font-weight: 500;
              color: #fff;
            }
          }
        }
      }
    }
  }

  .btnBox {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    right: 20px;
    bottom: 20px;
    left: 20px;
    position: fixed;

    .playPauseBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      padding: 8px;
      background: #7b849c;
      border-radius: 50%;

      svg {
        width: 14px;

        .fill {
          fill: #ccc;
        }
      }
    }

    .submitBtn {
      height: 50px;
      padding: 0 20px;
      color: #fff;
      font-weight: 700;
      background: #7879f1;
      border-radius: 40px;
    }

    .delBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      background: #7b849c;
      border-radius: 50%;

      svg {
        width: 14px;

        .fill {
          fill: #ccc;
        }
      }
    }

    .recordBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      padding: 8px;
      background: #7879f1;
      border-radius: 50%;

      img {
        width: 100%;
        height: 100%;
      }

      &.on {
        background: #ff5353;
      }
    }
  }
`;
