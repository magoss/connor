import parseDate from 'date-fns/parse';
import {zonedTimeToUtc} from 'date-fns-tz';
import { CampaignResultColumns } from './campaign-result-columns';

export const mapCampaignResult = (value: string, header: string): string | number => {
  if (header === CampaignResultColumns.Date) {
    let UTCDate;

    try {
      const date = parseDate(value, "dd.MM.yyyy", new Date());
      UTCDate = zonedTimeToUtc(date, "UTC").getTime();
    } catch (e) {
      UTCDate = NaN;
      console.error(`Value of "${value}" is not parsable date format. Internal error: ${e}`);
    }

    return UTCDate;
  } else {
    return value;
  }
}
