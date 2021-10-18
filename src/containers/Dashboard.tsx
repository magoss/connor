import React, {useState, useEffect} from 'react';
import {getCampaignResults} from '../api-client/campaign-result.repository';
import {CampaignResult} from '../model/campaign-result';
import {DataPoint} from '../model/data-point';
import {extractCampaignResultDataPoints} from '../data-extractors/campaign-result-data-point-extractor';
import CampaignResultsChart from '../components/CampaignResultsChart';
import FilterPanel from '../components/FilterPanel';
import Content from '../components/Content';

const Dashboard: React.FC = () => {

  const [campaignResults, setCampaignResults] = useState<CampaignResult[]>([]);
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [selectedDatasources, setSelectedDatasources] = useState<string[]>([]);
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const result = await getCampaignResults();
      setCampaignResults(result);
    })();
  }, []);

  useEffect(() => {
    const filteredDataPoints: DataPoint[] = extractCampaignResultDataPoints(campaignResults, selectedDatasources, selectedCampaigns);
    setDataPoints(filteredDataPoints);
  }, [campaignResults, selectedDatasources, selectedCampaigns]);

  const filterHandler = (selectedDatasources: string[], selectedCampaigns: string[]) => {
    setSelectedDatasources(selectedDatasources);
    setSelectedCampaigns(selectedCampaigns);
  }

  return (
    <Content>
      <FilterPanel campaignResults={campaignResults}
        onFilterChange={filterHandler} />
      <CampaignResultsChart dataPoints={dataPoints} />
    </Content>
  );
}

export default Dashboard;
