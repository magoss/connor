import React, { SyntheticEvent, useState, useEffect, ChangeEvent } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { CampaignResult } from '../model/campaign-result';
import { extractUnique } from '../data-extractors/unique-values-extractor';

type Props = {
  campaignResults: CampaignResult[],
  onFilterChange: (selectedDatasources: string[], selectedCampaigns: string[]) => void,
}

const FilterPanel: React.FC<Props> = ({ campaignResults, onFilterChange }) => {

  const [selectedDatasources, setSelectedDatasources] = useState<string[]>([]);
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [datasourceOptions, setDatasourceOptions] = useState<string[]>([]);
  const [campaignOptions, setCampaignOptions] = useState<string[]>([]);

  useEffect(() => {
    setDatasourceOptions(extractUnique("datasource", campaignResults));
    setCampaignOptions(extractUnique("campaign", campaignResults));
  }, [campaignResults]);

  const applyHandler = () => {
    onFilterChange(selectedDatasources, selectedCampaigns);
  }

  const changeDatasourceHandler = (event: SyntheticEvent, datasources: string[]): void => {
    setSelectedDatasources(datasources);
  }

  const changeCampaignHandler = (event: SyntheticEvent, campaigns: string[]): void => {
    setSelectedCampaigns(campaigns);
  }

  return (
    <>
      <Stack spacing={3} sx={{ width: 500 }}>
        <Autocomplete
          multiple
          id="datasources-autocomplete"
          options={datasourceOptions}
          defaultValue={[]}
          value={selectedDatasources}
          onChange={changeDatasourceHandler}
          getOptionLabel={(option: string) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Datasources"
            />
          )}
        />
        <Autocomplete
          multiple
          id="campaigns-autocomplete"
          options={campaignOptions}
          defaultValue={[]}
          value={selectedCampaigns}
          onChange={changeCampaignHandler}
          getOptionLabel={(option: string) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Campaigns"
            />
          )}
        />
        <Button variant="contained" onClick={applyHandler}>Apply</Button>
      </Stack>
    </>
  );
}

export default FilterPanel;
