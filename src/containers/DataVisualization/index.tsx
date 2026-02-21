import { useState } from 'react'

import Dropdown from '../../components/Dropdown'

import Charts from './Charts';
import History from './History';

type TabName = 'history' | 'charts';

const DataVisualization = () => {
  const [activeTab, setActiveTab] = useState<TabName>('history')

  return <>
    <Dropdown
      name="tab"
      label="View:"
      value={activeTab}
      onChange={(newTab) => setActiveTab(newTab)}
      options={['history', 'charts']}
    />

    {activeTab === 'charts' && <Charts />}
    {activeTab === 'history' && <History />}
  </>
}

export default DataVisualization