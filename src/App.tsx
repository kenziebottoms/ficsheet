import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Charts from './components/Charts';
import History from './components/History';

import type { DailyWordCountEntry } from './types';
import { selectAllWordCounts } from './api';

function App() {
  const [dailyEntries, setDailyEntries] = useState<DailyWordCountEntry[]>([])

  useEffect(() => {
    selectAllWordCounts().then(setDailyEntries)
  }, [])

  return (
    // For rendering MUI charts in dark mode
    <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
      <h1 className='p-2 text-center border-b-2 border-dashed border-zinc-500'>
        fic<span className='text-secondary'>sheet</span>
      </h1>
      <div className='w-full h-full flex flex-col lg:flex-row lg:flex-wrap divide-y-2 lg:divide-y-0 lg:divide-x-2 lg divide-zinc-500 divide-dashed'>
        <Charts className='grow' dailyEntries={dailyEntries} />
        <History className='grow' dailyEntries={dailyEntries} />
      </div>
    </ThemeProvider>
  )
}

export default App
