import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Charts from './components/Charts';
import DailyProjectWordCountForm from './components/DailyProjectWordCountForm';
import Button from './components/Button';

function App() {
  const [showEntryForm, setShowEntryForm] = useState<boolean>(false)

  return (
    // For rendering MUI charts in dark mode
    <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
      <div className='text-center border-b-2 border-dashed border-zinc-500 flex flex-row justify-between items-center gap-4 px-4 py-2'>
        <h1 className='grow'>fic<span className='text-primary'>sheet</span></h1>
        <Button
          onClick={() => setShowEntryForm(!showEntryForm)}
          style='primary'
        >
          Log
        </Button>
      </div>
      <div className='w-full h-full flex flex-col lg:flex-row lg:flex-wrap'>
        {showEntryForm && <DailyProjectWordCountForm className="bg-zinc-800 my-4 w-3/4 mx-auto" />}
        <Charts className='grow' />
      </div>
    </ThemeProvider>
  )
}

export default App
