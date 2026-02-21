import { type PropsWithChildren } from 'react'

type ButtonStyle = 'primary' | 'secondary' | 'subtle';

type Props = PropsWithChildren & {
  type?: "submit" | "reset" | "button";
  style?: ButtonStyle;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ButtonClassNames: Record<ButtonStyle, string> = {
  primary: 'bg-linear-45/shorter from-indigo-600 via-orange-400 to-indigo-500 from-15% via-80% to-90%',
  secondary: 'bg-linear-45/oklab from-pink-500 via-pink-400 to-pink-700 from-30% via-80% to-90%',
  subtle: 'bg-linear-45/shorter from-zinc-700 via-zinc-400/50 to-zinc-700 from-15% via-75% to-85%',
}

const Button = ({
  type = "button",
  onClick = () => { },
  style = 'subtle',
  children,
}: Props) => {
  return <button
    type={type}
    onClick={onClick}
    className={`text-xl font-mono font-medium text-white cursor-pointer rounded-lg py-2 px-3 transition duration-150 ease-in-out hover:brightness-100 brightness-125 hover:saturate-100 saturate-75 outline-primary-highlight focus-within:outline-primary-highlight ${ButtonClassNames[style]}`}
  >
    {children}
  </button>
}

export default Button