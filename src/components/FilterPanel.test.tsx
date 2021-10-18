import FilterPanel from "./FilterPanel";
import {shallow} from "enzyme";
import { CampaignResult } from "../model/campaign-result";
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

describe("FilterPanel", () => {
  let mockCampaignResults: CampaignResult[] = [],
    onFilterChangeSpy = jest.fn();

  beforeEach(() => {
    mockCampaignResults = [
      { date: 1633824000000, campaign: "first", datasource: "Google Adwords", clicks: 26, impressions: 67 },
      { date: 1633910400000, campaign: "first", datasource: "Facebook Ads", clicks: 12, impressions: 30 },
      { date: 1633824000000, campaign: "second", datasource: "Google Adwords", clicks: 34, impressions: 89 },
      { date: 1633910400000, campaign: "second", datasource: "Facebook Ads", clicks: 9, impressions: 31 },
    ];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("applies filters on click Apply", () => {
    const wrapper = shallow(<FilterPanel campaignResults={mockCampaignResults} onFilterChange={onFilterChangeSpy} />);
    const applyButton = wrapper.find(Button);
    applyButton.simulate("click");
    expect(onFilterChangeSpy).toHaveBeenCalledTimes(1);
  });

  it("sends back list of selected datasources", () => {
    const wrapper = shallow(<FilterPanel campaignResults={mockCampaignResults} onFilterChange={onFilterChangeSpy} />);
    wrapper.find(Autocomplete).at(0).simulate("change", {}, ["newly selected datasource"]);
    const applyButton = wrapper.find(Button);
    applyButton.simulate("click");
    expect(onFilterChangeSpy).toHaveBeenCalledWith(["newly selected datasource"], []);
  });

  it("sends back list of selected campaigns", () => {
    const wrapper = shallow(<FilterPanel campaignResults={mockCampaignResults} onFilterChange={onFilterChangeSpy} />);
    wrapper.find(Autocomplete).at(1).simulate("change", {}, ["campaign one", "campaign two"]);
    const applyButton = wrapper.find(Button);
    applyButton.simulate("click");
    expect(onFilterChangeSpy).toHaveBeenCalledWith([], ["campaign one", "campaign two"]);
  });
});
