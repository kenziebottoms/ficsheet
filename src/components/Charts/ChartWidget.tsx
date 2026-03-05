import type { PropsWithChildren } from "react";

import type { DailyWordCountEntry } from "../../types";

type Props = PropsWithChildren & {
  title: string;
  dailyEntries: DailyWordCountEntry[];
}
const ChartWidget = ({
  title,
  children,
}: Props) => {
  return <div className='rounded-lg border-2 border-dashed border-zinc-700 p-3'>
    <h3 className='mb-2'>{title}</h3>
    {children}
  </div>
}

export default ChartWidget