import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import DetailHeader from "../../components/header/DetailHeader";
import I_mikeWhite from "../../asset/icon/I_mikeWhite.svg";
import moment from "moment";

export default function Record() {
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
        <button
          className={`${onRecord ? "on" : ""} recordBtn`}
          onClick={onClickRecordBtn}
        >
          <img src={I_mikeWhite} alt="" />
        </button>

        <ul className="audioList">
          {audioList.map((v, i) => (
            <li key={i}>
              <p>{v.name}</p>
              <audio
                onEnded={() => {}}
                src={v.data}
                controls
                type="audio/mp3"
              />
            </li>
          ))}
        </ul>
      </RecordBox>
    </>
  );
}

const RecordBox = styled.main`
  height: 100%;
  padding: 50px 20px 20px;
  overflow-y: scroll;

  .recordBtn {
    width: 100%;
    height: 50px;
    padding: 8px;
    margin: 200px 0 0;
    background: #7879f1;
    border-radius: 20px;

    &.on {
      background: #ff5353;
    }

    img {
      height: 100%;
    }
  }
`;
