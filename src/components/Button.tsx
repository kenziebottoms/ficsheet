import { type PropsWithChildren } from 'react'
import type { SvgIconComponent } from '@mui/icons-material';

import {
  ButtonTextClassNames,
  ButtonBackgroundClassNames,
  type ButtonStyle,
  IconColors
} from './constants';

type Props = PropsWithChildren & {
  type?: "submit" | "reset" | "button";
  style?: ButtonStyle;
  small?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: SvgIconComponent;
}

const Button = ({
  type = "button",
  onClick = () => { },
  style = 'subtle',
  small = false,
  className = '',
  icon: Icon,
  children,
}: Props) => {
  return <button
    type={type}
    onClick={onClick}
    className={[
      small ? 'text-md rounded-md py-[0.2rem] px-2 gap-2' : 'text-xl rounded-lg py-1 px-6 gap-3',
      'flex flex-row items-center justify-center font-mono font-medium cursor-pointer transition duration-150 ease-in-out hover:brightness-125 hover:saturate-75 outline-primary-highlight focus-within:outline-primary-highlight',
      className,
      ButtonBackgroundClassNames[style],
      ButtonTextClassNames[style],
    ].join(" ")}
  >
    {children}
    {Icon && <Icon color={IconColors[style]} />}
  </button>
}

export default Button