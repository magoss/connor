import React, { useState, useEffect } from 'react';
import {getCampaignResults} from '../api-client/campaign-result.repository';
import {CampaignResult} from '../model/campaign-result';
import { DataPoint } from '../model/data-point';
import { extractCampaignResultDataPoints } from '../data-extractors/campaign-result-data-point-extractor';
import CampaignResultsChart from './CampaignResultsChart';

const Dashboard: React.FC = () => {

  const [campaignResults, setCampaignResults] = useState<CampaignResult[]>([]);
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [selectedDatasources, setSelectedDatasources] = useState<string[]>(["Google Analytics"]);
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>(["Offer Campaigns - Conversions", "B2B - Leads"]);

  useEffect(() => {
    (async () => {
      const result = await getCampaignResults();
      setCampaignResults(result);
    })();
  }, []);

  useEffect(() => {
    const filteredData: DataPoint[] = extractCampaignResultDataPoints(campaignResults, selectedDatasources, selectedCampaigns);
    setDataPoints(filteredData);
  }, [campaignResults, selectedDatasources, selectedCampaigns]);

  return (
    <>
      <div className="chart-container">
        <CampaignResultsChart dataPoints={dataPoints} />
      </div>
    </>
  );
}

export default Dashboard;
