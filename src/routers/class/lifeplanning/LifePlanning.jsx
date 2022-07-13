import { useEffect, useState } from "react";
import styled from "styled-components";
import DetailHeader from "../../../components/header/DetailHeader";
import Chart from "../../../components/class/lifechart/Chart";
import axios from "axios";
import { API } from "../../../config/api";
import PopupBg from "../../../components/common/PopupBg";
import AlertPopup from "../../../components/common/AlertPopup";

export default function LifeChart() {
  const [postData, setPostData] = useState(
    new Array(1).fill({ x: "", y: "", memo: "" })
  );
  const [chartData, setChartData] = useState(
    new Array(1).fill({ x: "", y: "" })
  );
  const [alertPopup, setAlertPopup] = useState(false);

  function getData() {
    axios
      .get(`${API.CLASS_GETDATA}/lifeplanning`)
      .then(({ data }) => {
        console.log(data);

        setPostData([...data.resData.value]);
        setChartData([...data.resData.value]);
      })
      .catch((err) => console.error(err));
  }

  function onChangeInput(i, type, value) {
    let _postData = postData;
    let _chartData = chartData;

    switch (type) {
      case "age":
        _postData[i].x = Number(value);
        _chartData[i].x = Number(value);
        break;

      case "happiness":
        _postData[i].y = Number(value);
        _chartData[i].y = Number(value);
        break;

      case "memo":
        _postData[i].memo = value;
        break;

      default:
        break;
    }
    console.log(i, _chartData);

    setPostData([..._postData]);
    setChartData([..._chartData]);
  }

  function chkDuplicateData() {
    let _duplicateData = postData.filter(
      (arr, index, callback) =>
        index !== callback.findIndex((t) => t.x === arr.x)
    );

    console.log(_duplicateData);

    if (_duplicateData[0]) {
      setAlertPopup(`${_duplicateData[0].x}살이 중복되어 있습니다.`);
      throw `${_duplicateData[0].x}살이 중복되어 있습니다.`;
    }
  }

  function onClickSubmitBtn() {
    console.log(postData);

    try {
      chkDuplicateData();
    } catch (err) {
      console.error(err);
      return;
    }

    let _postData = postData;

    _postData = _postData.filter((e) => {
      if (e.x !== "" && e.y !== "") return true;
    });

    _postData = _postData.sort((a, b) => {
      return a.x - b.x;
    });

    axios
      .post(API.CLASS_SUBMIT, { class: "lifeplanning", value: _postData })
      .then((res) => {
        console.log(res);
        setAlertPopup("Submit Complete");
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const last = postData[postData.length - 1];

    if (last.x || last.y || last.memo) {
      setPostData([...postData, { x: "", y: "", memo: "" }]);
      setChartData([...chartData, { x: "", y: "" }]);
    }
  }, [postData]);

  return (
    <>
      <DetailHeader title="Life Planning" />

      <LifeChartBox>
        <section className="innerSec">
          <div className="chartCont">
            <Chart chartData={[...chartData]} />
          </div>

          <article className="inputArea">
            <strong className="title">Plan List</strong>

            <ul className="inputList">
              {postData.map((v, i) => (
                <li key={i}>
                  <div className="opt age">
                    <p className="key">Age</p>

                    <div className="value">
                      <input
                        min={0}
                        type={"number"}
                        value={v.x}
                        onChange={(e) =>
                          onChangeInput(i, "age", e.target.value)
                        }
                        placeholder="3"
                      />
                    </div>
                  </div>

                  <div className=" opt happiness">
                    <p className="key">Happiness</p>

                    <div className="value">
                      <input
                        min={-100}
                        max={100}
                        type={"number"}
                        value={v.y}
                        onChange={(e) =>
                          onChangeInput(i, "happiness", e.target.value)
                        }
                        placeholder="100"
                      />
                    </div>
                  </div>

                  <div className="opt memo">
                    <p className="key">Memo</p>

                    <div className="value">
                      <textarea
                        value={v.memo}
                        onChange={(e) =>
                          onChangeInput(i, "memo", e.target.value)
                        }
                        placeholder="Back in the day, ..."
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <button className="submitBtn" onClick={onClickSubmitBtn}>
              Submit
            </button>
          </article>
        </section>
      </LifeChartBox>

      {alertPopup && (
        <>
          <AlertPopup cont={alertPopup} off={() => setAlertPopup()} />
          <PopupBg bg off={() => setAlertPopup()} />
        </>
      )}
    </>
  );
}

const LifeChartBox = styled.main`
  height: 100%;
  padding: 0 20px 20px;
  overflow-y: scroll;

  .innerSec {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .chartCont {
      height: 100vw;
      overflow-x: scroll;

      &::-webkit-scrollbar {
        height: 8px;
      }

      &::-webkit-scrollbar-thumb {
        height: 8px;
        background-color: #999;
        border-radius: 4px;
      }
    }

    .inputArea {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;
      overflow-y: scroll;

      .title {
        display: block;
        margin: 0 auto;
        font-size: 20px;
        text-align: center;
      }

      .inputList {
        display: flex;
        flex-direction: column;
        gap: 20px;

        li {
          display: flex;
          flex-direction: column;
          gap: 12px;

          &:nth-of-type(n + 2) {
            padding: 20px 0 0;
            border-top: 1px dashed #ccc;
          }

          .opt {
            display: flex;
            flex-direction: column;
            gap: 8px;

            .key {
              font-size: 12px;
              color: #6d7582;
            }

            .value {
              display: flex;
              align-items: center;
              min-height: 36px;
              font-weight: 600;
              border: 2px solid #ddd;
              border-radius: 8px;
              overflow: hidden;

              &:focus-within {
                border-color: #7879f1;
              }

              input {
                flex: 1;
                padding: 0 8px;
              }

              textarea {
                flex: 1;
                padding: 8px;
                height: 80px;
              }
            }
          }
        }
      }

      .submitBtn {
        width: 120px;
        height: 50px;
        margin: 20px 0 0;
        color: #fff;
        font-weight: 500;
        background: #7879f1;
        border-radius: 8px;
      }
    }
  }
`;
