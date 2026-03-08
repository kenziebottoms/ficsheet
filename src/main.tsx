import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.tsx'

import { DataCacheProvider } from './contexts/DataCache/DataCacheProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DataCacheProvider>
      <App />
    </DataCacheProvider>
  </StrictMode>,
)
