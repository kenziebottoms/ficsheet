import { NavLink } from 'react-router'

import Button from '@/components/Button'

const YearNavMenu = ({ availableYears }: { availableYears: number[] }) => {
  return <div className="w-full flex flex-row items-center gap-2 overflow-x-auto px-2">
    <NavLink to="/all-time" className="block">
      {({ isActive }) => (
        <Button
          style={isActive ? 'primary' : 'subtle'}
          className={`${isActive ? 'rounded-b-none py-2' : 'mb-2'} whitespace-nowrap transition-all duration-100 capitalize`}
        >
          All Time
        </Button>)}
    </NavLink>

    {availableYears.map(y => <NavLink
      key={y}
      to={`/${y}`}
      className="block"
    >
      {({ isActive }) => (
        <Button
          style={isActive ? 'secondary' : 'subtle'}
          className={`${isActive ? 'rounded-b-none py-2' : 'mb-2'} whitespace-nowrap transition-all duration-100 capitalize`}
        >
          {y}
        </Button>
      )}
    </NavLink>)}
  </div>
}

export default YearNavMenu