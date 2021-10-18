import React, {useState, useEffect} from 'react';
import { ChartData } from 'chart.js';
import { Line } from "react-chartjs-2";
import formatDate from 'date-fns/format'
import { DataPoint } from '../model/data-point';
import ChartContainer from './ChartContainer';

type Props = {
  dataPoints: DataPoint[],
}

const CampaignResultsChart: React.FC<Props> = ({dataPoints}) => {

  const [chartData, setChartData] = useState<ChartData>({ labels: [], datasets: [] });

  const buildChartData = (dataPoints: DataPoint[]): ChartData => {
    return {
      labels: dataPoints.map((dp: DataPoint) => dp.date ? formatDate(dp.date, "dd-MM-yyyy") : ""),
      datasets: [{
        label: "Clicks",
        data: dataPoints.map((dp: DataPoint) => dp.clicks),
        fill: true,
        backgroundColor: "#FFDC73",
        borderColor: "#FFBF00"
      },
      {
        label: "Impressions",
        data: dataPoints.map((dp: DataPoint) => dp.impressions),
        fill: false,
        borderColor: "#444444"
      }]
    }
  }

  useEffect(() => {
    setChartData(buildChartData(dataPoints))
  }, [dataPoints]);

  return (
    <ChartContainer>
      <Line data={chartData}
        height={400}
        width={900}
      />
    </ChartContainer>
  );
}

export default CampaignResultsChart;
