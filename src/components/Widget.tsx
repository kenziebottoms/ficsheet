import type { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  title: string;
  subtitle?: string;
}
const Widget = ({
  title,
  subtitle,
  children,
}: Props) => {
  return <div className='rounded-lg border-2 border-dashed border-zinc-700 p-3'>
    <h4 className='mb-2'>{title}</h4>
    {subtitle && <h5>{subtitle}</h5>}
    {children}
  </div>
}

export default Widget