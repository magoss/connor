import { ChartData } from "chart.js";
import { shallow } from "enzyme";
import { Line } from "react-chartjs-2";
import CampaignResultsChart from "./CampaignResultsChart";

describe("Campaign Results Chart", () => {
  const dataPoints = [
    { date: 1633824000000, clicks: 11, impressions: 111 },
    { date: 1633910400000, clicks: 22, impressions: 222 },
    { date: 1633996800000, clicks: 33, impressions: 333 },
    { date: 1634083200000, clicks: 44, impressions: 444 },
  ];

  it("passes expected labels to Line Chart", () => {
    const wrapper = shallow(<CampaignResultsChart dataPoints={dataPoints} />);
    const dataProp = wrapper.find(Line).prop("data") as ChartData;
    expect(dataProp.labels).toStrictEqual(["10-10-2021", "11-10-2021", "12-10-2021", "13-10-2021"]);
  });

  it("passes expected data to Line Chart", () => {
    const wrapper = shallow(<CampaignResultsChart dataPoints={dataPoints} />);
    const dataProp = wrapper.find(Line).prop("data") as ChartData;
    expect(dataProp.datasets[0].label).toBe("Clicks");
    expect(dataProp.datasets[0].data).toStrictEqual([11, 22, 33, 44]);
    expect(dataProp.datasets[1].label).toBe("Impressions");
    expect(dataProp.datasets[1].data).toStrictEqual([111, 222, 333, 444]);
  });
});
