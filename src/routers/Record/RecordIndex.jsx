import styled from "styled-components";
import DetailHeader from "../../components/header/DetailHeader";
import I_rtArw from "../../asset/icon/I_rtArw.svg";
import I_pause from "../../asset/icon/I_pause.svg";
import I_play from "../../asset/icon/I_play.svg";
import I_mikeWhite from "../../asset/icon/I_mikeWhite.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { API } from "../../config/api";
import WaveSurfer from "wavesurfer.js";

export default function RecordIndex() {
  const navigate = useNavigate();

  const [listData, setListData] = useState([]);
  const [waveSurferList, setWaveSurferList] = useState([]);

  function markUpWave({ i, audioUrl }) {
    let _waveBox = document.getElementById(`waveBox${i}`);

    const waveSurfer = WaveSurfer.create({
      container: _waveBox,
      barWidth: 1,
      cursorColor: " #7879f1",
      progressColor: " #7879f1",
      scrollParent: true,
    });

    waveSurfer.load(audioUrl);

    waveSurfer.on("ready", () => {
      let _waveSurferList = waveSurferList;
      _waveSurferList[i] = waveSurfer;
      setWaveSurferList([..._waveSurferList]);
      // waveRef.current = waveSurfer;
    });
  }

  function onToggleDetail(e, v, i) {
    if (e.target.open && !waveSurferList[i])
      axios
        .get(`${API.RECORD}/${v.target_id}`)
        .then(({ data }) => {
          console.log(data);

          markUpWave({ i, audioUrl: data.audioUrl });
        })
        .catch(console.error);
  }

  function onClickActionBtn(i) {
    waveSurferList[i].playPause();
  }

  function getAudioQuery() {
    let _waveSurferList = waveSurferList;

    setTimeout(() => {
      setWaveSurferList([..._waveSurferList]);
    }, 1);
  }

  function getAudioTime(type, i) {
    console.log(waveSurferList[i]);
    let currentTime = (waveSurferList[i] && waveSurferList[i].currentTime) || 0;
    let duration = (waveSurferList[i] && waveSurferList[i].duration) || 0;

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

  function getList() {
    axios
      .get(API.RECORD)
      .then(({ data }) => {
        console.log(data.resData);

        setListData(data.resData);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if (!waveSurferList[0]) return;

    let _interval = setInterval(getAudioQuery, 500);

    return () => {
      clearInterval(_interval);
    };
  }, [waveSurferList]);

  return (
    <>
      <DetailHeader title="Record" />

      <RecordIndexBox>
        <nav className="navList">
          {listData.map((v, i) => (
            <details key={i} onToggle={(e) => onToggleDetail(e, v, i)}>
              <summary>
                {moment(v.createdate).format("YYYY/MM/DD HH.mm.ss")}
              </summary>

              <div className="openCont">
                <div className="contBox">
                  <button
                    className={`actionBtn`}
                    onClick={() => onClickActionBtn(i)}
                  >
                    <img
                      className="iPlay"
                      src={waveSurferList[i]?.isPlaying() ? I_pause : I_play}
                      alt=""
                    />
                  </button>
                  <div id={`waveBox${i}`} className="waveBox"></div>
                </div>

                <div className="infoBox">
                  <p className="progress">
                    <span
                      className={`${
                        waveSurferList[i] &&
                        waveSurferList[i].currentTime &&
                        "current"
                      } `}
                    >
                      {(getAudioTime("current"), i)}
                    </span>
                    ~{(getAudioTime("duration"), i)}
                  </p>
                </div>
              </div>
            </details>
          ))}
        </nav>

        <nav className={`recordBtn`} onClick={() => navigate("create")}>
          <img src={I_mikeWhite} alt="" />
        </nav>
      </RecordIndexBox>
    </>
  );
}

const RecordIndexBox = styled.main`
  padding: 50px 0 0;

  .navList {
    padding: 0 20px;
    summary {
      display: flex;
      align-items: center;
      height: 32px;
    }

    .openCont {
      .contBox {
        display: flex;
        align-items: center;
        gap: 20px;
        height: 140px;

        .actionBtn {
          width: 22px;
          height: 22px;
          border-radius: 50%;

          img {
            width: 100%;
          }
        }

        .waveBox {
          flex: 1;
          padding: 4px;
          background: #eee;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 5px 10px -12px inset,
            rgba(0, 0, 0, 0.3) 0px 6px 12px -6px inset;
        }
      }

      .infoBox {
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  .recordBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    min-height: 60px;
    padding: 10px;
    background: #7879f1;
    right: 0;
    bottom: 0;
    left: 0;
    position: fixed;

    img {
      height: 100%;
    }
  }
`;
