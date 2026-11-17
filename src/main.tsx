import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './index.css'
import App from './App.tsx'
import AdminPanel from '@/containers/AdminPanel/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* For rendering MUI charts in dark mode */}
    <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
      <BrowserRouter>
        <Routes>
          <Route path="admin" element={<AdminPanel />} />
          <Route index path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
