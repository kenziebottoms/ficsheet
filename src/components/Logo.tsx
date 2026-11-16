import Ficsheet from '@/assets/ficsheet.svg';

const Logo = () => {
  return <h3 className='shrink-0 text-xs md:mb-2 md:px-3 flex flex-row items-center gap-2'>
    <img
      src={Ficsheet}
      alt="FicSheet logo"
      className="w-8 h-8"
    />
    <div>
      fic<span className='text-primary-medium'>sheet</span>
    </div>
  </h3>
}

export default Logo