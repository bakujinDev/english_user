import { ResponsiveLine } from "@nivo/line";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Chart({ chartData, color }) {
  const [data, setData] = useState(chartData);

  useEffect(() => {
    if (!chartData[0].x) return;

    chartData = chartData.filter((e) => e.x && e.y);

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
        colors={[color]}
        theme={{
          textColor: "#fff",
        }}
      />
    </ChartBox>
  );
}

const ChartBox = styled.div`
  width: 200vw;
  height: 100%;
  padding: 40px 60px 0 0;
`;
