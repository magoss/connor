import React from "react";
import {shallow} from "enzyme";
import Dashboard from "./Dashboard";
import * as repository from '../api-client/campaign-result.repository';
import { CampaignResult } from "../model/campaign-result";
import * as extractor from '../data-extractors/campaign-result-data-point-extractor';
import { DataPoint } from "../model/data-point";
import CampaignResultsChart from "../components/CampaignResultsChart";
import FilterPanel from "../components/FilterPanel";

describe("Dashboard", () => {
  let mockCampaignResults: CampaignResult[],
    mockDataPoints: DataPoint[];

  beforeEach(() => {
    mockCampaignResults = [
      { date: 1633824000000, campaign: "first", datasource: "Google Adwords", clicks: 26, impressions: 67 },
      { date: 1633910400000, campaign: "first", datasource: "Facebook Ads", clicks: 12, impressions: 30 },
      { date: 1633824000000, campaign: "second", datasource: "Google Adwords", clicks: 34, impressions: 89 },
      { date: 1633910400000, campaign: "second", datasource: "Facebook Ads", clicks: 9, impressions: 31 },
    ];

    mockDataPoints = [
      { date: 1633824000000, clicks: 11, impressions: 111 },
      { date: 1633824000000, clicks: 22, impressions: 222 },
      { date: 1633824000000, clicks: 33, impressions: 333 },
      { date: 1633824000000, clicks: 44, impressions: 444 },
    ];
  });

  it("fetches expected data on mount", () => {
    const getCampaignResultsSpy = jest.spyOn(repository, "getCampaignResults")
      .mockResolvedValue(mockCampaignResults);
    shallow(<Dashboard />);
    expect(getCampaignResultsSpy).toHaveBeenCalledTimes(1);
  });

  it("extracts data points from campaign results", () => {
    const extractCampaignResultDataPointsSpy = jest.spyOn(extractor, "extractCampaignResultDataPoints")
      .mockImplementation(() => mockDataPoints);
    shallow(<Dashboard />);
    expect(extractCampaignResultDataPointsSpy).toHaveBeenCalledTimes(1);
  });

  it("renders CampaignResultsChart", () => {
    const wrapper = shallow(<Dashboard />);
    const chart = wrapper.find(CampaignResultsChart);
    expect(chart.exists()).toBe(true);
  });

  it("renders FilterPanel", () => {
    const wrapper = shallow(<Dashboard />);
    const panel = wrapper.find(FilterPanel);
    expect(panel.exists()).toBe(true);
  });
});
