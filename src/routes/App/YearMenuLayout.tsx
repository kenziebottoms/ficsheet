import { use } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { Login, Logout, Troubleshoot } from '@mui/icons-material';

import Button from '@/components/Button';
import Footer from '@/components/Footer';
import Logo from '@/components/Logo';
import YearNavMenu from '@/components/YearNavMenu';

import { AuthContext } from '@/contexts/Auth/AuthContext';

const YearMenuLayout = ({
  availableYears,
}: {
  availableYears: number[];
}) => {
  const { user, setShowWelcomeModal } = use(AuthContext)

  return <div className='w-100vw h-full'>
    <div className="w-full flex flex-col gap-2 sm:flex-row items-center justify-between pt-2 pr-2">
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

      {user == null && <Button
        style="cautionary"
        small
        icon={Login}
        className="whitespace-nowrap"
        onClick={() => setShowWelcomeModal(true)}
      >
        Log in
      </Button>}

      {user != null && <NavLink to="/logout" className="grow-0 shrink-0">
        <Button
          style="cautionary"
          small
          icon={Logout}
          className="whitespace-nowrap"
        >
          Log out
        </Button>
      </NavLink>}
    </div>
    <Outlet />
    <Footer />
  </div>
}

export default YearMenuLayout