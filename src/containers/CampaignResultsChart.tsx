import React, {useState, useEffect} from 'react';
import { ChartData } from 'chart.js';
import { Line } from "react-chartjs-2";
import formatDate from 'date-fns/format'
import { DataPoint } from '../model/data-point';

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
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Impressions",
        data: dataPoints.map((dp: DataPoint) => dp.impressions),
        fill: false,
        borderColor: "#742774"
      }]
    }
  }

  useEffect(() => {
    setChartData(buildChartData(dataPoints))
  }, [dataPoints]);

  return (
    <>
      <Line data={chartData}
        height={300}
        width={750}
      />
    </>
  );
}

export default CampaignResultsChart;
