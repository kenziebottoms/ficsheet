import type { PropsWithChildren } from "react";

import { ButtonTextClassNames, ButtonBackgroundClassNames, type ButtonStyle } from "./constants";

const BadgeContainerClassNames: Record<ButtonStyle, string> = {
  primary: "border-indigo-500",
  secondary: "border-pink-500",
  subtle: "border-zinc-400",
};
const BadgeBodyClassNames: Record<ButtonStyle, string> = {
  primary:
    "text-purple-300 text-shadow-lg/50 text-shadow-violet-800 bg-linear-45/shorter from-indigo-800/50 via-orange-600/50 to-indigo-800/50 from-15% via-75% to-90%",
  secondary:
    "text-pink-300 text-shadow-lg/50 text-shadow-pink-950 bg-linear-45/oklab from-pink-900/50 via-pink-600/50 to-pink-900/50 from-30% via-80% to-90%",
  subtle:
    "text-zinc-400 text-shadow-lg/30 bg-linear-45/shorter from-zinc-800/50 via-zinc-600/50 to-zinc-800/50 from-20% via-80% to-90%",
};

type Props = PropsWithChildren & {
  title: string;
  style?: ButtonStyle;
  className?: string;
}
const Badge = ({
  title,
  style = "primary",
  className,
  children,
}: Props) => {
  return <div className={[
    className,
    BadgeContainerClassNames[style],
    'flex flex-col rounded-lg border-2 border-dashed bg-background',
  ].join(" ")}>
    <h5 className={[
      ButtonTextClassNames[style],
      ButtonBackgroundClassNames[style],
      'p-3 rounded-t-lg shadow-md/50'
    ].join(" ")}>
      {title}
    </h5>
    <div className={[
      "p-3 text-center rounded-b-lg text-3xl font-light font-mono",
      BadgeBodyClassNames[style]
    ].join(" ")}>
      {children}
    </div>
  </div>
}

export default Badge