import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Button from './components/Button';
import Charts from './components/Charts';
import DailyProjectWordCountForm from './components/History/DailyProjectWordCountForm';

function App() {
  const [showEntryForm, setShowEntryForm] = useState<boolean>(false)
  return (
    // For rendering MUI charts in dark mode
    <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
      <div className='p-2 text-center border-b-2 border-dashed border-zinc-500 flex flex-row justify-between items-center'>
        <h1>fic<span className='text-primary'>sheet</span></h1>
        <Button
          onClick={() => setShowEntryForm(!showEntryForm)}
          style="primary"
        >
          Log
        </Button>
      </div>
      <div className='w-full h-full flex flex-col lg:flex-row lg:flex-wrap divide-y-2 lg:divide-y-0 lg:divide-x-2 lg divide-zinc-500 divide-dashed'>
        {showEntryForm && <DailyProjectWordCountForm className='w-full' />}
        <Charts className='grow' />
      </div>
    </ThemeProvider>
  )
}

export default App
