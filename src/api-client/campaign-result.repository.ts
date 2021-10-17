import {parse, ParseResult} from 'papaparse';
import {CampaignResult} from '../model/campaign-result';
import {mapCampaignResult} from './campaign-result.mapper';

export const getCampaignResults = async (): Promise<CampaignResult[]> => {
  const campaignResultsEndpoint: string =
    "http://adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv";
  
  return new Promise((resolve, reject) => {
    parse<CampaignResult>(campaignResultsEndpoint, {
      download: true,
      header: true,
      dynamicTyping: true,
      transform: mapCampaignResult,
      transformHeader: (header: string) => header.toLowerCase(),
      complete: (campaignResult: ParseResult<CampaignResult>) => {
        resolve(campaignResult.data);
      },
      error(err: Error) {
        reject(err);
      }
    });
  });
}
