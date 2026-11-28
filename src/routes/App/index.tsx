import { Route, Routes } from 'react-router';

import Redirect from '@/components/Redirect';

import AllTime from './AllTime';
import Charts from './Charts';
import YearMenuLayout from './YearMenuLayout';

function App() {
  return (
    <Routes>
      <Route index element={<Redirect to={`/year/${new Date().getFullYear()}`} />} />
      <Route path="year" element={<YearMenuLayout />}>
        <Route index element={<Redirect to={`/year/${new Date().getFullYear()}`} />} />
        <Route path="all" element={<AllTime />} />
        <Route index path=":year" element={<Charts />} />
      </Route>
    </Routes>
  )
}

export default App
