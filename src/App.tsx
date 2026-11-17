import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';

import { selectAvailableYears } from '@/api'

import YearMenuLayout from '@/components/YearMenuLayout';

import AllTime from '@/containers/AllTime';
import Charts from '@/containers/Charts';


function App() {
  const [availableYears, setAvailableYears] = useState([new Date().getFullYear()])

  const refreshYears = () => selectAvailableYears().then(setAvailableYears)

  useEffect(() => {
    refreshYears()
  }, [])

  return (
    <Routes>
      <Route path="year" element={<YearMenuLayout availableYears={availableYears} />}>
        <Route path="all" element={<AllTime availableYears={availableYears} />} />
        <Route index path=":year?" element={<Charts />} />
      </Route>
      <Route index path=":year?" element={<Charts />} />
    </Routes>
  )
}

export default App
