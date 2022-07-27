import styled from "styled-components";
import I_play from "../../../asset/icon/I_play.svg";
import I_pause from "../../../asset/icon/I_pause.svg";
import moment from "moment";
import { useEffect, useRef, useState } from "react";

export default function RecordCont({ v, i }) {
  const audioRef = useRef();

  const [audioCurrent, setAudioCurrent] = useState("");

  function onClickActionBtn(i) {
    console.log(document.getElementById(`audio${i}`));
    console.log(document.getElementById(`audio${i}`).currentTime);
    console.log(document.getElementById(`audio${i}`).duration);
  }

  console.log(v);

  useEffect(() => {
    setTimeout(() => {
      setAudioCurrent(audioRef.current);
    }, 1);
  }, [audioRef]);

  return (
    <RecordContBox>
      <summary>
        <div className="summaryCont">
          <button className="actionBtn" onClick={() => onClickActionBtn(i)}>
            <img className="iPlay" src={I_play} alt="" />
            <img className="iPause" src={I_pause} alt="" />
          </button>

          <div className="contBox">
            <div className="topBar">
              <p className="time">{moment(new Date()).format("HH:mm:ss")}</p>
            </div>

            <div className="contBar">
              <p className="progress">0:00 ~{audioCurrent?.duration}</p>
            </div>
          </div>

          <audio
            ref={audioRef}
            id={`audio${i}`}
            onEnded={() => {}}
            src={v.data}
            controls
            type="audio/mp3"
          />
        </div>
      </summary>
    </RecordContBox>
  );
}

const RecordContBox = styled.details``;
