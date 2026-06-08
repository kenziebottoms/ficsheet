import { colors, getDynamicColorPalette } from '@/containers/Charts/constants';
import type { TimelineData } from '@/types'

const Timeline = ({
  xAxisLabels,
  data,
}: {
  xAxisLabels: string[];
  data: TimelineData[];
}) => {
  const xAxisValues = data.map(td => td.range.map(r => r)).flat(2)
  const range = Math.max(...xAxisValues) - Math.min(...xAxisValues) + 1

  return <div
    className='grid gap-y-1 border-l border-white py-2'
    style={{ 'gridAutoColumns': `${100 / range}%` }}
  >
    {data.map((row, rowIndex) => row.range
      .map((subRange, rangeIndex) => <>
        <div
          key={`${row.label}_${rangeIndex}_bg`}
          style={{
            gridRow: rowIndex * 2 + 1,
            gridColumn: `${subRange[0]} / span ${subRange[1] - subRange[0] + 1}`,
            background: getDynamicColorPalette(data.length)[rowIndex] || colors[0]
          }}
        >
          &nbsp;
        </div>
        <div
          key={`${row.label}_${rangeIndex}_label`}
          style={{
            gridRow: rowIndex * 2 + 2,
            gridColumn: `${subRange[0]} / span ${subRange[1] - subRange[0] + 1}`
          }}
          className='-mt-7.5 text-center'
        >
          <div className='bg-zinc-700 rounded-xl px-2 py-[0.1rem] inline-flex text-xs'>
            {row.label}
          </div>
        </div>
      </>))}
    {xAxisLabels.map((label, labelIndex) => <div
      key={label}
      style={{
        gridRow: data.length * 2 + 1,
        gridColumn: labelIndex + 1
      }}
      className='px-2 pt-1 border-t border-white/50'
    >
      {label}
    </div>)}
  </div>
}

export default Timeline