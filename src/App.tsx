import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Button from './components/Button';
import Charts from './components/Charts';
import History from './components/History';
import DailyProjectWordCountForm from './components/History/DailyProjectWordCountForm';
import type { ButtonStyle } from './components/constants';

type Tab = 'charts' | 'log' | 'history';

const ActiveTabButtonStyles: Record<Tab, ButtonStyle> = {
  charts: 'primary',
  log: "primary",
  history: "secondary",
}

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('charts')

  return (
    // For rendering MUI charts in dark mode
    <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
      <div className='text-center border-b-2 border-dashed border-zinc-500 flex flex-row justify-between items-center gap-4 px-4 py-2'>
        <h1 className='grow'>fic<span className='text-primary'>sheet</span></h1>
        {([
          'charts',
          'history',
          'log'
        ] as Tab[]).map(tab =>
          <Button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={activeTab === tab ? ActiveTabButtonStyles[tab] : 'subtle'}
            className='capitalize'
          >
            {tab}
          </Button>
        )}
      </div>
      <div className='w-full h-full flex flex-col lg:flex-row lg:flex-wrap divide-y-2 lg:divide-y-0 lg:divide-x-2 lg divide-zinc-500 divide-dashed'>
        {activeTab === 'charts' && <Charts className='grow' />}
        {activeTab === 'log' && <DailyProjectWordCountForm className='w-full' />}
        {activeTab === 'history' && <History className='grow' />}
      </div>
    </ThemeProvider>
  )
}

export default App
