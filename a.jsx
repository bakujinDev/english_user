<section className="innerBox">
<article className="contArea">
  <div className="topBar">
    <button className="outBtn" onClick={() => navigate(-1)}>
      <I_ltArw />
      <p className="pageTitle">{param.username}</p>
    </button>

    <span className="dateBox">
      <ReactDatePicker
        selected={targetDate}
        onChange={(date) => setTargetDate(date)}
        dateFormat="yyyy/MM"
        showMonthYearPicker
        showFullMonthYearPicker
        calendarClassName={`${darkMode && "darkMode"} customPicker`}
        customInput={<CustomInput />}
        // renderCustomHeader={<CustomHeader />}
        renderCustomHeader={CustomHeader}
      />
    </span>
  </div>

  <div className="monthCont">
    {[0, 1, 2, 3, 4]
      .filter((v) => dataWeek.find((e) => e === v) + 1)
      .map((monthV, i) => (
        <details key={i} className="weekDetails">
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
                  onToggle={(e) => onToggleDetail(e, v, i)}
                >
                  <summary>
                    {moment(v.createdate).format(
                      "YYYY/MM/DD HH:mm:ss"
                    )}
                  </summary>

                  <div className="openCont">
                    <div className="contBox">
                      <div
                        id={`waveBox${i}`}
                        className="waveBox"
                      ></div>
                    </div>

                    <div className="infoBox">
                      <button
                        className={`actionBtn`}
                        onClick={() => onClickActionBtn(i)}
                      >
                        {waveSurferList[i]?.isPlaying() ? (
                          <I_pause />
                        ) : (
                          <I_play />
                        )}
                      </button>

                      <p className="progress">
                        <span
                          className={`${
                            waveSurferList[i] &&
                            waveSurferList[i]?.getCurrentTime() &&
                            "current"
                          } `}
                        >
                          {getAudioTime({ type: "current", i })}
                        </span>
                        ~{getAudioTime({ type: "duration", i })}
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


flex: 1;
  height: 100%;
  overflow-y: scroll;
  padding: 50px 20px 20px;

  .innerBox {
    display: flex;
    justify-content: center;
    width: 100%;

    .contArea {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
      padding: 20px;
      background: #2a2f3b;
      border: 1px solid #484d5a;
      border-radius: 10px;
      overflow-y: scroll;

      .topBar {
        display: flex;
        justify-content: space-between;
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