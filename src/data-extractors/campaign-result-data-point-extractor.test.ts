import { CampaignResult } from '../model/campaign-result';
import { extractCampaignResultDataPoints } from './campaign-result-data-point-extractor';

describe("Campaign Result Data Point Extractor", () => {
  let mockCampaignResults: CampaignResult[];

  beforeEach(() => {
    mockCampaignResults = [
      { date: 1633824000000, campaign: "first", datasource: "Google Adwords", clicks: 26, impressions: 67 },
      { date: 1633910400000, campaign: "first", datasource: "Facebook Ads", clicks: 12, impressions: 30 },
      { date: 1633824000000, campaign: "second", datasource: "Google Adwords", clicks: 34, impressions: 89 },
      { date: 1633910400000, campaign: "second", datasource: "Facebook Ads", clicks: 9, impressions: 31 },
    ];
  });

  it("extracts empty array of data points if there are no data matches", () => {
    const dataPoints = extractCampaignResultDataPoints([], [], []);
    expect(dataPoints).toStrictEqual([]);
  });

  it("extracts expected data points for input data without specific datasources and campaigns defined", () => {
    const dataPoints = extractCampaignResultDataPoints(mockCampaignResults, [], []);
    expect(dataPoints.length).toEqual(2);
    expect(dataPoints).toStrictEqual([
      { date: 1633824000000, clicks: 60, impressions: 156 },
      { date: 1633910400000, clicks: 21, impressions: 61 },
    ]);
  });

  it("extracts expected data points for input with specific datasources defined", () => {
    const dataPoints = extractCampaignResultDataPoints(mockCampaignResults, ["Google Adwords"], []);
    expect(dataPoints.length).toEqual(1);
    expect(dataPoints).toStrictEqual([
      { date: 1633824000000, clicks: 60, impressions: 156 },
    ]);
  });

  it("extracts expected data points for input with specific campaign defined", () => {
    const dataPoints = extractCampaignResultDataPoints(mockCampaignResults, [], ["first"]);
    expect(dataPoints.length).toEqual(2);
    expect(dataPoints).toStrictEqual([
      { date: 1633824000000, clicks: 26, impressions: 67 },
      { date: 1633910400000, clicks: 12, impressions: 30 },
    ]);
  });

  it("extracts expected data points for input with both specific campaigns and datasources defined", () => {
    const dataPoints = extractCampaignResultDataPoints(mockCampaignResults, ["Google Adwords", "Facebook Ads"], ["second"]);
    expect(dataPoints.length).toEqual(2);
    expect(dataPoints).toStrictEqual([
      { date: 1633824000000, clicks: 34, impressions: 89 },
      { date: 1633910400000, clicks: 9, impressions: 31 },
    ]);
  });
});
