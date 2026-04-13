import type { PropsWithChildren } from "react"

import { type ButtonStyle } from "./constants"

const PillClassNames: Partial<Record<ButtonStyle, string>> = {
  primary: "bg-pink-700/50 text-pink-300",
};

type Props = PropsWithChildren & {
  style: ButtonStyle;
}
const Pill = ({
  style,
  children
}: Props) => {
  return <div className={["font-sans rounded-xl text-sm px-2 py-1", PillClassNames[style]].join(" ")}>
    {children}
  </div>
}

export default Pill