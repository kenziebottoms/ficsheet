import { Link, NavLink, Outlet } from 'react-router';
import { Logout, Troubleshoot } from '@mui/icons-material';

import Button from '@/components/Button';
import Footer from '@/components/Footer';
import Logo from '@/components/Logo';
import YearNavMenu from '@/components/YearNavMenu';

const YearMenuLayout = ({
  availableYears,
}: {
  availableYears: number[];
}) => {
  return <div className='w-100vw h-full'>
    <div className="w-full flex flex-col gap-2 md:flex-row items-center justify-between pt-2 pr-2">
      <Link to="/" className='block grow-0 shrink-0'>
        <Logo />
      </Link>

      <YearNavMenu availableYears={availableYears} />

      <div className='grow' />

      {import.meta.env.DEV && <NavLink to="/admin" className="grow-0 shrink-0">
        <Button
          style="transparent"
          small
          icon={Troubleshoot}
        >
          Admin
        </Button>
      </NavLink>}

      <NavLink to="/logout" className="grow-0 shrink-0">
        <Button
          style="cautionary"
          small
          icon={Logout}
          className="whitespace-nowrap"
        >
          Log out
        </Button>
      </NavLink>
    </div>
    <Outlet />
    <Footer />
  </div>
}

export default YearMenuLayout