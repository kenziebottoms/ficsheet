import { PieChart } from '@mui/x-charts';

import Widget from '@/components/Widget';

import type { Fandom } from '@/types'

import { getDynamicColorPalette } from '../Charts/constants';

const AllTimeFandomPieChart = ({
  fandoms
}: {
  fandoms: Fandom[];
}) => {
  if (fandoms == null) return null;

  const data = fandoms.map(({ name, totalWordsWritten }) => ({
    label: name,
    value: totalWordsWritten,
  }))

  return <Widget title="Word Count By Fandom">
    <PieChart
      series={[{ data, innerRadius: '50%' }]}
      width={800}
      height={800}
      colors={getDynamicColorPalette(fandoms.length)}
      slotProps={{ legend: { direction: 'vertical' } }}
    />
  </Widget>
}

export default AllTimeFandomPieChart