import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Router from '@/routes'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* For rendering MUI charts in dark mode */}
    <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
      <Router />
    </ThemeProvider>
  </StrictMode>,
)
