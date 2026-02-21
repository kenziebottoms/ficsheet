import { useState } from 'react'

import ButtonGroup from '../../components/ButtonGroup';

import Charts from './Charts';
import History from './History';

type TabName = 'history' | 'charts';

const DataVisualization = () => {
  const [activeTab, setActiveTab] = useState<TabName>('history')

  return <>
    <ButtonGroup
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