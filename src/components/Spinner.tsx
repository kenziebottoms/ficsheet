import { ButtonBackgroundClassNames, type ButtonStyle } from './constants';

const Spinner = ({
  style = 'primary'
}: {
  style?: ButtonStyle;
}) => {
  return <div className={`${ButtonBackgroundClassNames[style]} animate-spin w-10 h-10 rounded-full`}>
    <div className='sr-only'>Loading...</div>
  </div>
}

export default Spinner