import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';

import { selectAvailableYears } from '@/api'

import Redirect from '@/components/Redirect';

import AllTime from './AllTime';
import Charts from './Charts';
import YearMenuLayout from './YearMenuLayout';

function App() {
  const [availableYears, setAvailableYears] = useState([new Date().getFullYear()])

  const refreshYears = () => selectAvailableYears().then(setAvailableYears)

  useEffect(() => {
    refreshYears()
  }, [])

  return (
    <Routes>
      <Route index element={<Redirect to={`/year/${new Date().getFullYear()}`} />} />
      <Route path="year" element={<YearMenuLayout availableYears={availableYears} />}>
        <Route index element={<Redirect to={`/year/${new Date().getFullYear()}`} />} />
        <Route path="all" element={<AllTime availableYears={availableYears} />} />
        <Route index path=":year" element={<Charts />} />
      </Route>
    </Routes>
  )
}

export default App
