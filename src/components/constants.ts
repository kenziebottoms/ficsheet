export type ButtonStyle =
  | "primary"
  | "secondary"
  | "subtle"
  | "transparent"
  | "cautionary";

export const ButtonTextClassNames: Record<ButtonStyle, string> = {
  primary: "text-white text-shadow-lg/50 text-shadow-violet-800",
  secondary: "text-white text-shadow-lg/50 text-shadow-pink-950",
  subtle: "text-white text-shadow-lg/30",
  transparent: "text-pink-300",
  cautionary: "text-orange-400",
};
export const ButtonBackgroundClassNames: Record<ButtonStyle, string> = {
  primary:
    "bg-linear-45/shorter from-indigo-600 via-orange-400 to-indigo-500 from-15% via-75% to-90%",
  secondary:
    "bg-linear-45/oklab from-pink-700 via-pink-400 to-pink-700 from-30% via-80% to-90%",
  subtle:
    "bg-linear-45/shorter from-zinc-600 via-zinc-400 to-zinc-600 from-20% via-80% to-90%",
  transparent: "border-2 border-pink-300",
  cautionary: "border-2 border-orange-400",
};

export const IconColors: Record<
  ButtonStyle,
  | "primary"
  | "secondary"
  | "inherit"
  | "action"
  | "disabled"
  | "error"
  | "info"
  | "success"
  | "warning"
> = {
  primary: "secondary",
  secondary: "secondary",
  subtle: "secondary",
  transparent: "secondary",
  cautionary: "warning",
};
