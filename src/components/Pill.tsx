import type { PropsWithChildren } from "react"

import { type ButtonStyle } from "./constants"

const PillClassNames: Partial<Record<ButtonStyle, string>> = {
  primary: "bg-pink-700/50 text-pink-300",
};

type Props = PropsWithChildren & {
  style: ButtonStyle;
  className?: string;
}
const Pill = ({
  style,
  className = '',
  children,
}: Props) => {
  return <div className={`${className} font-sans rounded-xl text-sm px-2 py-1 whitespace-nowrap flex flex-row items-center gap-1 ${PillClassNames[style]}`}>
    {children}
  </div>
}

export default Pill