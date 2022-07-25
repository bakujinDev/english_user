import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import DetailHeader from "../../components/header/DetailHeader";
import I_mikeWhite from "../../asset/icon/I_mikeWhite.svg";
import moment from "moment";

export default function Record() {
  const listRef = useRef();

  const [recorder, setRecorder] = useState("");
  const [onRecord, setOnRecord] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [audioList, setAudioList] = useState(new Array(0).fill(""));

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
      name: moment(new Date()).format("HH:mm:ss"),
    });
  }

  function onClickActionBtn(i) {
    let _audio = document.getElementById(`audio${i}`);
    console.log(_audio);
    _audio.play();
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
    // _audioList = _audioList.filter((e) => e);

    setAudioList([..._audioList]);
  }, [audioUrl]);

  return (
    <>
      <DetailHeader title="record" />

      <RecordBox>
        <article className="contArea">
          <p className="title">record list</p>

          <ul className="audioList" ref={listRef}>
            {audioList.map((v, i) => (
              <li key={i}>
                <p>{v.name}</p>
                <audio
                  id={`audio${i}`}
                  onEnded={() => {}}
                  src={v.data}
                  controls
                  type="audio/mp3"
                />
                <button
                  className="actionBtn"
                  onClick={() => onClickActionBtn(i)}
                >
                  Play
                </button>
              </li>
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
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: hidden;

  .contArea {
    flex: 1;
    overflow-y: scroll;

    .title {
      padding: 0 20px;
      font-size: 20px;
      color: #353535;
    }

    .audioList {
      li {
        height: 54px;

        /* audio {
          width: 0;
          height: 0;
        } */
      }
    }
  }

  .recordBtn {
    width: 100%;
    height: 60px;
    min-height: 60px;
    padding: 10px;
    background: #7879f1;

    &.on {
      background: #ff5353;
    }

    img {
      height: 100%;
    }
  }
`;
