import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router'
import { ArrowDropDownSharp, Close } from '@mui/icons-material';

import Button from '@/components/Button'

const YearNavMenu = ({ availableYears }: { availableYears: number[] }) => {
  const [showYears, setShowYears] = useState(false)
  const navigate = useNavigate()
  const { year } = useParams()
  const thisYear = new Date().getFullYear()
  const yearIsHistorical = (year != null && parseInt(year, 10) < thisYear)

  useEffect(() => {
    setShowYears(false)
  }, [year])

  return <div className="w-full flex flex-row items-center gap-2 overflow-x-auto px-2">
    <NavLink to="/year/all" className="block">
      {({ isActive }) => (
        <Button
          style={isActive ? 'primary' : 'subtle'}
          className={`${isActive ? 'rounded-b-none py-2' : 'mb-2'} whitespace-nowrap transition-all duration-100 capitalize`}
        >
          All Time
        </Button>
      )}
    </NavLink>

    <NavLink to={`/year/${thisYear}`} className="block">
      {({ isActive }) => (
        <Button
          style={isActive ? 'secondary' : 'subtle'}
          className={`${isActive ? 'rounded-b-none py-2' : 'mb-2'} whitespace-nowrap transition-all duration-100 capitalize`}
        >
          {thisYear}
        </Button>
      )}
    </NavLink>

    {yearIsHistorical ?
      <div>
        <Button
          icon={showYears ? Close : ArrowDropDownSharp}
          className="text-white whitespace-nowrap rounded-b-none py-2 w-30"
          style="secondary"
          onClick={() => setShowYears(!showYears)}
        >
          {year}
        </Button>

        <div className={`block p-2 bg-pink-700 rounded-lg shadow-lg/60 absolute top-8 w-30 max-h-80 overflow-y-auto space-y-1 transition-all duration-100 ${showYears ? 'opacity-100 translate-y-4 z-10' : 'opacity-0 translate-y-0 -z-10'}`}>
          {availableYears.slice(1).map(y => <NavLink
            key={y}
            to={`/year/${y}`}
            className="block w-full"
          >
            {({ isActive }) => (
              <Button
                style={isActive ? 'primary' : 'subtle'}
                className="w-full whitespace-nowrap transition-all duration-100"
                disabled={!showYears}
              >
                {y}
              </Button>
            )}
          </NavLink>)}
        </div>
      </div>
      :
      <Button
        icon={ArrowDropDownSharp}
        className="text-white whitespace-nowrap mb-2 w-30"
        style="subtle"
        onClick={() => navigate(`/year/${thisYear - 1}`)}
      >
        {thisYear - 1}
      </Button>}
  </div>
}

export default YearNavMenu