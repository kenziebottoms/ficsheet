import { useState } from 'react'

import ButtonGroup from '../../components/ButtonGroup';

import Charts from './Charts';
import History from './History';

type TabName = 'history' | 'charts';

const DataVisualization = () => {
  const [activeTab, setActiveTab] = useState<TabName>('history')

  return <>
    <div className='bg-zinc-950 py-2 px-8'>
      <ButtonGroup
        label="View:"
        value={activeTab}
        onChange={(newTab) => setActiveTab(newTab)}
        options={['history', 'charts']}
        className='bg-zinc-800 rounded-full py-2 px-4 items-center justify-center gap-4'
        smallButtons
      />
    </div>

    <div className='bg-zinc-800 p-3'>
      {activeTab === 'charts' && <Charts />}
      {activeTab === 'history' && <History />}
    </div>
  </>
}

export default DataVisualization