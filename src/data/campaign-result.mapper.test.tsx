import { CampaignResultColumns } from "./campaign-result-columns";
import { mapCampaignResult } from "./campaign-result.mapper";

describe("Campaign Results Mapper", () => {
  it("transforms date string in expected format to unix timestamp expressed in milliseconds", () => {
    const result = mapCampaignResult("01.03.2019", CampaignResultColumns.Date);
    expect(result).toBe(1551398400000);
  });

  it("returns NaN for unexpected input date format", () => {
    const result = mapCampaignResult("unexpected date format", CampaignResultColumns.Date);
    expect(result).toBeNaN();
  });

  it("leaves other column values intact", () => {
    const campaignResult = mapCampaignResult("Some fancy campaign", CampaignResultColumns.Campaign);
    const datasourceResult = mapCampaignResult("Facebook Ads", CampaignResultColumns.Datasource);
    const clicksResult = mapCampaignResult("43", CampaignResultColumns.Clicks);
    const impressionsResult = mapCampaignResult("765", CampaignResultColumns.Impressions);
    expect(campaignResult).toBe("Some fancy campaign");
    expect(datasourceResult).toBe("Facebook Ads");
    expect(clicksResult).toBe("43");
    expect(impressionsResult).toBe("765");
  });
});