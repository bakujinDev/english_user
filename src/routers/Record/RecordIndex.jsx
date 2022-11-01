import styled from "styled-components";
import DetailHeader from "../../components/header/DetailHeader";
import I_mikeWhite from "../../asset/icon/I_mikeWhite.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { API } from "../../config/api";
import WaveSurfer from "wavesurfer.js";
import ReactDatePicker from "react-datepicker";
import { CustomHeader, CustomInput } from "../../util/CustomDatePicker";
import { ReactComponent as I_pause } from "../../asset/icon/I_pause.svg";
import { ReactComponent as I_play } from "../../asset/icon/I_play.svg";

export default function RecordIndex() {
  const navigate = useNavigate();
  const weekNum = 6;

  const [listData, setListData] = useState([]);
  const [waveSurferList, setWaveSurferList] = useState(
    Array.from(Array(weekNum), () => new Array(1))
  );
  const [targetDate, setTargetDate] = useState(new Date());
  const [dataWeek, setDataWeek] = useState([]);

  function markUpWave({ monthI, i, audioUrl }) {
    let _waveBox = document.getElementById(`waveBox${monthI}_${i}`);

    const waveSurfer = WaveSurfer.create({
      container: _waveBox,
      barWidth: 1,
      cursorColor: " #7879f1",
      progressColor: " #7879f1",
      scrollParent: true,
      backgroundColor: "#323741",
    });

    waveSurfer.load(audioUrl);

    waveSurfer.on("ready", () => {
      let _waveSurferList = waveSurferList;
      _waveSurferList[monthI][i] = waveSurfer;
      setWaveSurferList([..._waveSurferList]);
    });
  }

  function onToggleDetail(e, v, monthI, i) {
    if (e.target.open && !waveSurferList[monthI][i]) {
      axios
        .get(`${API.RECORD}/${v.target_id}`)
        .then(({ data }) => {
          console.log(data);

          markUpWave({ monthI, i, audioUrl: data.audioUrl });
        })
        .catch(console.error);
    }
  }

  function onClickActionBtn(monthI, i) {
    waveSurferList[monthI][i].playPause();
  }

  function getAudioQuery() {
    let _waveSurferList = waveSurferList;

    setTimeout(() => {
      setWaveSurferList([..._waveSurferList]);
    }, 1);
  }

  function getAudioTime({ type, monthI, i }) {
    let currentTime = waveSurferList[monthI][i]?.getCurrentTime() || 0;
    let duration = waveSurferList[monthI][i]?.getDuration() || 0;

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

  function getDataWeek(list) {
    let _dataWeek = list.map((e) => {
      const _createTime = moment(e.createdate).utc(true);
      return _createTime.week() - moment(_createTime).startOf("month").week();
    });

    setDataWeek(_dataWeek);
  }

  function getList() {
    axios
      .get(API.RECORD, {
        params: {
          date: new Date(targetDate.setDate(10)),
        },
      })
      .then(({ data }) => {
        console.log(data.resData);
        getDataWeek(data.resData);
        setListData(data.resData);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    return () => sessionStorage.setItem("reload", true);
  }, []);

  useEffect(() => {
    setListData([]);
    waveSurferList.map((e) => e && e.map((detV) => detV.destroy()));
    setWaveSurferList(Array.from(Array(weekNum), () => new Array(1)));
  }, [targetDate]);

  useEffect(() => {
    getList();
  }, [targetDate]);

  useEffect(() => {
    let _interval = setInterval(getAudioQuery, 500);

    return () => clearInterval(_interval);
  }, [waveSurferList]);

  return (
    <>
      <DetailHeader title="Record" />

      <RecordIndexBox>
        <section className="innerBox">
          <article className="contArea">
            <div className="topBar">
              <span className="dateBox">
                <ReactDatePicker
                  selected={targetDate}
                  onChange={(date) => setTargetDate(date)}
                  dateFormat="yyyy/MM"
                  showMonthYearPicker
                  showFullMonthYearPicker
                  calendarClassName={`customPicker`}
                  customInput={<CustomInput />}
                  renderCustomHeader={CustomHeader}
                />
              </span>
            </div>

            <div className="monthCont">
              {[...Array(waveSurferList.length).keys()]
                .filter((v) => dataWeek.find((e) => e === v) + 1)
                .map((monthV, monthI) => (
                  <details key={monthI} className="weekDetails">
                    <summary>
                      <span className="summaryBox">
                        <p className="key">{monthV + 1}th week</p>
                        <div className="line" />
                      </span>
                    </summary>

                    <ul className="recordList">
                      {listData
                        .filter((v, i) => dataWeek[i] === monthV)
                        .map((v, i) => (
                          <details
                            key={i}
                            onToggle={(e) => onToggleDetail(e, v, monthI, i)}
                          >
                            <summary>
                              {moment(v.createdate).format(
                                "YYYY/MM/DD HH:mm:ss"
                              )}
                            </summary>

                            <div className="openCont">
                              <div className="contBox">
                                <div
                                  id={`waveBox${monthI}_${i}`}
                                  className="waveBox"
                                ></div>
                              </div>

                              <div className="infoBox">
                                <button
                                  className={`actionBtn`}
                                  onClick={() => onClickActionBtn(monthI, i)}
                                >
                                  {waveSurferList[monthI][i]?.isPlaying() ? (
                                    <I_pause />
                                  ) : (
                                    <I_play />
                                  )}
                                </button>

                                <p className="progress">
                                  <span
                                    className={`${
                                      waveSurferList[monthI][
                                        i
                                      ]?.getCurrentTime() && "current"
                                    } `}
                                  >
                                    {getAudioTime({
                                      type: "current",
                                      monthI,
                                      i,
                                    })}
                                  </span>
                                  ~
                                  {getAudioTime({
                                    type: "duration",
                                    monthI,
                                    i,
                                  })}
                                </p>
                              </div>
                            </div>
                          </details>
                        ))}
                    </ul>
                  </details>
                ))}
            </div>
          </article>
        </section>

        <nav className={`recordBtn`} onClick={() => navigate("create")}>
          <img src={I_mikeWhite} alt="" />
        </nav>
      </RecordIndexBox>
    </>
  );
}

const RecordIndexBox = styled.main`
  height: 100vh;
  padding: 50px 0 60px;

  .innerBox {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;

    .contArea {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
      height: 100%;
      padding: 10px 20px;
      overflow-y: scroll;

      .topBar {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .outBtn {
          display: flex;
          align-items: center;
          gap: 8px;

          svg {
            height: 16px;

            .fill {
              fill: #7b849c;
            }
          }

          .pageTitle {
            font-size: 20px;
            line-height: 20px;
            font-weight: 600;
            font-family: "Poppins", sans-serif;
            color: #7b849c;
          }
        }

        .dateBox {
          width: 100px;
        }
      }

      .monthCont {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .weekDetails {
          color: #7b849c;

          &[open] {
            & > summary {
              .summaryBox {
                color: #97a2bf;

                .key {
                }

                .line {
                  border-color: #97a2bf;
                }
              }
            }
          }

          summary {
            .summaryBox {
              display: flex;
              align-items: center;
              gap: 4px;
              .key {
              }

              .line {
                flex: 1;
                height: 1px;
                border-bottom: 1px dashed #7b849c;
              }
            }
          }

          .recordList {
            display: flex;
            flex-direction: column;
            gap: 4px;

            details {
              padding: 4px 0;

              &[open] {
                & > summary {
                  color: #fff;
                }
              }

              summary {
                display: flex;
                align-items: center;
                height: 32px;
              }

              .openCont {
                display: flex;
                flex-direction: column;
                gap: 4px;

                .contBox {
                  display: flex;
                  align-items: center;
                  gap: 20px;
                  height: 140px;

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
                  justify-content: space-between;
                  align-items: center;

                  .actionBtn {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 30px;
                    height: 30px;
                    padding: 8px;
                    border-radius: 50%;
                    background: #2a55c0;

                    svg {
                      height: 100%;

                      .fill {
                        fill: #fff;
                      }
                    }
                  }

                  .progress {
                    color: #7b849c;

                    .current {
                      color: #fff;
                    }
                  }
                }
              }
            }
          }
        }
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
