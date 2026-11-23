import { BrowserRouter, Route, Routes } from 'react-router'

import { AuthProvider } from '@/contexts/Auth/AuthProvider'

import AdminPanel from './AdminPanel'
import App from './App'

const Router = () => {
  return <AuthProvider>
    <BrowserRouter>
      <Routes>
        {import.meta.env.DEV && <Route path="admin" element={<AdminPanel />} />}
        <Route index path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
}

export default Router