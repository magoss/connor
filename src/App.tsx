import React, { useEffect } from 'react';
import { getCampaignResults } from './data/campaign-result.repository';

function App() {

  useEffect(() => {
    (async () => {
      const result = await getCampaignResults();
      console.log(result);
    })();
  }, []);

  return (
    <div className="App">
      <p>initial commit</p>
    </div>
  );
}

export default App;
