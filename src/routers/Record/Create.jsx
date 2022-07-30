import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import DetailHeader from "../../components/header/DetailHeader";
import I_import from "../../asset/icon/I_import.svg";
import I_mikeWhite from "../../asset/icon/I_mikeWhite.svg";
import I_x from "../../asset/icon/I_x.svg";
import I_play from "../../asset/icon/I_play.svg";
import I_pause from "../../asset/icon/I_pause.svg";
import WaveSurfer from "wavesurfer.js";
import axios from "axios";
import { API } from "../../config/api";
import AlertPopup from "../../components/common/AlertPopup";
import PopupBg from "../../components/common/PopupBg";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const importInputRef = useRef();
  const waveRef = useRef();
  const navigate = useNavigate();

  const [recorder, setRecorder] = useState("");
  const [onRecord, setOnRecord] = useState(false);
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
              <img src={I_import} alt="" />

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
                <span className={`${waveStatus.currentTime && "current"} `}>
                  {getAudioTime("current")}
                </span>
                ~{getAudioTime("duration")}
              </p>
            </div>
          </article>
        </section>

        <div className="btnBox">
          {audioUrl ? (
            <>
              <button className={`playPauseBtn`} onClick={onClickActionBtn}>
                <img
                  className="iPlay"
                  src={waveStatus && waveStatus?.isPlaying ? I_pause : I_play}
                  alt=""
                />
              </button>

              <button
                className="submitBtn"
                disabled={uploadBusy}
                onClick={onClickSubmitBtn}
              >
                Submit
              </button>

              <button className="delBtn" onClick={onClickDelBtn}>
                <img src={I_x} alt="" />
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

      {alertPopup && (
        <>
          <AlertPopup
            cont={alertPopup}
            off={() => {
              setAlertPopup();
              sessionStorage.setItem("reload", true);
              navigate(-1);
            }}
          />
          <PopupBg
            bg
            off={() => {
              setAlertPopup();
              sessionStorage.setItem("reload", true);
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
        aspect-ratio: 1;
        padding: 8px 8px 8px 10px;
        border-radius: 50%;
        background: #f9f9f9;
        position: relative;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
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
          box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
            rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
        }

        .progress {
          display: flex;
          justify-content: flex-end;

          .current {
            font-weight: 500;
            color: #7879f1;
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
      background: #f9f9f9;
      border-radius: 50%;

      img {
        width: 14px;
        opacity: 0.4;
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
      background: #f9f9f9;
      border-radius: 50%;

      img {
        opacity: 0.4;
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
