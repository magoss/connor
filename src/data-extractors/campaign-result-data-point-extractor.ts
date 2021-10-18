import filter from 'lodash/fp/filter';
import flow from "lodash/fp/flow";
import groupBy from "lodash/fp/groupBy";
import map from "lodash/fp/map";
import sumBy from "lodash/fp/sumBy";
import head from "lodash/fp/head";
import { CampaignResultColumns } from '../api-client/campaign-result-columns';
import { CampaignResult } from '../model/campaign-result';

export const extractCampaignResultDataPoints = (campaignResults: CampaignResult[],
                                                 datasources: string[],
                                                 campaigns: string[]) => {
  return flow(
    filter((campaignResult: CampaignResult) =>
      datasources.length ? datasources.includes(campaignResult.datasource) : true),
    filter((campaignResult: CampaignResult) =>
      campaigns.length ? campaigns.includes(campaignResult.campaign) : true),
    groupBy(CampaignResultColumns.Date),
    map((grouped: any[]) => {
      return {
        date: head(grouped).date,
        clicks: flow(sumBy((campaignResult: CampaignResult) => campaignResult.clicks))(grouped),
        impressions: flow(sumBy((campaignResult: CampaignResult) => campaignResult.impressions))(grouped),
      }
    }),
  )(campaignResults);
}
