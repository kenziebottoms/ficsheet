export type ButtonStyle = "primary" | "secondary" | "subtle";

export const ButtonClassNames: Record<ButtonStyle, string> = {
  primary:
    "text-shadow-lg/50 text-shadow-violet-800 bg-linear-45/shorter from-indigo-600 via-orange-400 to-indigo-500 from-15% via-75% to-90%",
  secondary:
    "text-shadow-lg/50 text-shadow-pink-950 bg-linear-45/oklab from-pink-700 via-pink-400 to-pink-700 from-30% via-80% to-90%",
  subtle:
    "text-shadow-lg/30 bg-linear-45/shorter from-zinc-600 via-zinc-400 to-zinc-600 from-20% via-80% to-90%",
};
