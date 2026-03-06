import type { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  title: string;
}
const ChartWidget = ({
  title,
  children,
}: Props) => {
  return <div className='rounded-lg border-2 border-dashed border-zinc-700 p-3'>
    <h4 className='mb-2'>{title}</h4>
    {children}
  </div>
}

export default ChartWidget