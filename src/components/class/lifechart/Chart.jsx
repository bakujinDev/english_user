import { ResponsiveLine } from "@nivo/line";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Chart({ chartData }) {
  const [data, setData] = useState(chartData);

  useEffect(() => {
    if (!chartData[0].x) return;

    setData(chartData.sort((a, b) => a.x - b.x));
  }, [chartData]);

  return (
    <ChartBox>
      <ResponsiveLine
        data={[{ id: "lifeChart", color: "hsl(234, 70%, 50%)", data }]}
        margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
        xScale={{ type: "linear" }}
        yScale={{
          type: "linear",
          min: "-100",
          max: "100",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "age",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "happiness",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[]}
        colors={["#7879f1"]}
      />
    </ChartBox>
  );
}

const ChartBox = styled.div`
  width: 200vw;
  aspect-ratio: 2;
  padding: 40px 60px 0 0;
`;

const initData = [
  {
    id: "lifeChart",
    color: "hsl(297, 70%, 50%)",
    data: [
      {
        x: "1",
        y: null,
      },
      {
        x: 2,
        y: 94,
      },
      {
        x: 5,
        y: 270,
      },
      {
        x: 6,
        y: 143,
      },
      {
        x: 12,
        y: 123,
      },
      {
        x: 20,
        y: 262,
      },
      {
        x: 22,
        y: 138,
      },
      {
        x: 24,
        y: 30,
      },
      {
        x: 26,
        y: 98,
      },
    ],
  },
];
