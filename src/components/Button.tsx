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
  circular?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: SvgIconComponent;
  disabled?: boolean;
  label?: string;
}

const Button = ({
  type = "button",
  onClick = () => { },
  style = 'subtle',
  small = false,
  circular = false,
  className = '',
  icon: Icon,
  disabled,
  children,
  label,
}: Props) => {
  return <button
    type={type}
    onClick={onClick}
    aria-label={label}
    className={[
      circular ? 'rounded-full p-2' : (small ? 'rounded-md py-[0.2rem] px-2' : 'rounded-lg py-1 px-6'),
      small ? 'text-md gap-2' : 'text-xl gap-3',
      'flex flex-row items-center justify-center font-medium cursor-pointer transition duration-150 ease-in-out hover:brightness-125 hover:saturate-75 outline-primary-highlight focus-within:outline-primary-highlight',
      className,
      ButtonBackgroundClassNames[style],
      ButtonTextClassNames[style],
    ].join(" ")}
    disabled={disabled}
  >
    {children}
    {Icon && <Icon color={IconColors[style]} />}
  </button>
}

export default Button