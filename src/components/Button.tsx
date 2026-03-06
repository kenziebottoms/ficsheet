import { type PropsWithChildren } from 'react'

type ButtonStyle = 'primary' | 'secondary' | 'subtle';

type Props = PropsWithChildren & {
  type?: "submit" | "reset" | "button";
  style?: ButtonStyle;
  small?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ButtonClassNames: Record<ButtonStyle, string> = {
  primary: 'text-shadow-lg/50 text-shadow-violet-800 bg-linear-45/shorter from-indigo-600 via-orange-400 to-indigo-500 from-15% via-75% to-90%',
  secondary: 'text-shadow-lg/50 text-shadow-pink-950 bg-linear-45/oklab from-pink-700 via-pink-400 to-pink-700 from-30% via-80% to-90%',
  subtle: 'text-shadow-lg/30 bg-linear-45/shorter from-zinc-600 via-zinc-400 to-zinc-600 from-20% via-80% to-90%',
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