import { useEffect, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router';
import { Troubleshoot } from '@mui/icons-material';

import { selectAvailableYears } from '@/api'

import AllTime from '@/containers/AllTime';
import Charts from '@/containers/Charts';

import Button from '@/components/Button';
import Footer from '@/components/Footer';
import Logo from '@/components/Logo';
import YearNavMenu from '@/components/YearNavMenu';

function App() {
  const [availableYears, setAvailableYears] = useState([new Date().getFullYear()])

  const refreshYears = () => selectAvailableYears().then(setAvailableYears)

  useEffect(() => {
    refreshYears()
  }, [])

  return (
    <div className='w-100vw h-full'>
      <div className="w-full flex flex-col md:flex-row items-center pt-2">
        <Logo />
        <YearNavMenu availableYears={availableYears} />
        <NavLink to="/admin">
          <Button
            style="cautionary"
            small
            icon={Troubleshoot}
            className="mb-2"
          >
            Admin
          </Button>
        </NavLink>
      </div>
      <Routes>
        <Route path="all-time" element={<AllTime availableYears={availableYears} />} />
        <Route index path=":year?" element={<Charts />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
