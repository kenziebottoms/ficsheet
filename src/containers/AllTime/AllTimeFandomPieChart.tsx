import { PieChart } from '@mui/x-charts';

import Widget from '@/components/Widget';

import type { FandomTotal } from '@/types'

import { getDynamicColorPalette } from '../Charts/constants';

const AllTimeFandomPieChart = ({
  fandomTotals
}: {
  fandomTotals: FandomTotal[];
}) => {
  if (fandomTotals == null) return null;

  const data = fandomTotals.map(({ fandom, count }) => ({
    label: fandom,
    value: count,
  }))

  return <Widget title="Word Count By Fandom">
    <PieChart
      series={[{ data }]}
      width={800}
      height={600}
      colors={getDynamicColorPalette(fandomTotals.length)}
      slotProps={{
        legend: {
          direction: 'vertical'
        }
      }}
    />
  </Widget>
}

export default AllTimeFandomPieChart