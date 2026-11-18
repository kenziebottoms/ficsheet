import { Link, NavLink, Outlet } from 'react-router';
import { Troubleshoot } from '@mui/icons-material';

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
    <div className="w-full flex flex-col md:flex-row items-center pt-2">
      <Link to="/" className='block grow-0 shrink-0'>
        <Logo />
      </Link>
      <YearNavMenu availableYears={availableYears} />
      <NavLink to="/admin">
        <Button
          style="cautionary"
          small
          icon={Troubleshoot}
          className="mb-2 mr-2"
        >
          Admin
        </Button>
      </NavLink>
    </div>
    <Outlet />
    <Footer />
  </div>
}

export default YearMenuLayout