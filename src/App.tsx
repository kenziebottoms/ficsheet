import { createTheme, ThemeProvider } from '@mui/material/styles';

import Charts from '@/containers/Charts';

function App() {

  return (
    // For rendering MUI charts in dark mode
    <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
      <div className='w-100vw h-full flex flex-col lg:flex-row lg:flex-wrap'>
        <Charts />
      </div>
    </ThemeProvider>
  )
}

export default App
