import { type PropsWithChildren } from 'react'

type Props = PropsWithChildren & {
  type: "submit" | "reset" | "button";
}
const Button = ({
  type,
  children,
}: Props) => {
  return <button
    type={type}
    className='bg-pink-500/50 hover:bg-pink-500/75 transition-colors duration-200 ease-in-out cursor-pointer rounded-md px-3 py-2'
  >
    {children}
  </button>
}

export default Button