import { type PropsWithChildren } from 'react'

import { ButtonClassNames, type ButtonStyle } from './constants';

type Props = PropsWithChildren & {
  type?: "submit" | "reset" | "button";
  style?: ButtonStyle;
  small?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  type = "button",
  onClick = () => { },
  style = 'subtle',
  small = false,
  className = '',
  children,
}: Props) => {
  return <button
    type={type}
    onClick={onClick}
    className={[
      small ? 'text-md rounded-md py-[0.2rem] px-3' : 'text-xl rounded-lg py-1 px-6',
      'font-mono font-medium text-white cursor-pointer transition duration-150 ease-in-out hover:brightness-125 hover:saturate-75 outline-primary-highlight focus-within:outline-primary-highlight',
      className,
      ButtonClassNames[style],
    ].join(" ")}
  >
    {children}
  </button>
}

export default Button