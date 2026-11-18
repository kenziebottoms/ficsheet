import { BrowserRouter, Route, Routes } from 'react-router'

import AdminPanel from './AdminPanel'
import App from './App'

const Router = () => {
  return <BrowserRouter>
    <Routes>
      {import.meta.env.DEV && <Route path="admin" element={<AdminPanel />} />}
      <Route index path="*" element={<App />} />
    </Routes>
  </BrowserRouter>
}

export default Router