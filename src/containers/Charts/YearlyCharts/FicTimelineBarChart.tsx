import { use } from 'react';
import { differenceInMonths, parse } from 'date-fns';
import _ from 'lodash';

import Timeline from '@/components/Timeline';
import Widget from '@/components/Widget'

import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext';
import { YearContext } from '@/contexts/Year/YearContext';

import { MonthNames, type TimelineData } from '@/types';

const FicTimelineBarChart = () => {
  const { year } = use(YearContext)
  const { fics } = use(DataCacheContext)

  const earliestDate = _.minBy(fics, 'firstWritten')?.firstWritten;
  const latestDate = _.maxBy(fics, 'lastWritten')?.lastWritten;
  if (year == null || earliestDate == null || latestDate == null) return null;

  const dayBeforeEarliestDate = parse(`${year - 1}-12-01`, 'yyyy-MM-dd', new Date())
  const fandomTemperatures: TimelineData[] = _.orderBy(fics, 'firstWritten').map((fic) => {
    return {
      label: fic.name,
      range: [[
        differenceInMonths(parse(fic.firstWritten, 'yyyy-MM-dd', new Date()), dayBeforeEarliestDate),
        differenceInMonths(parse(fic.lastWritten, 'yyyy-MM-dd', new Date()), dayBeforeEarliestDate),
      ]]
    }
  })

  return <Widget title="Fic Timeline">
    <Timeline
      xAxisLabels={MonthNames
        .map(monthName => monthName.slice(0, 3))
        .slice(0, year === new Date().getFullYear() ? new Date().getMonth() + 1 : 12)}
      data={fandomTemperatures}
    />
  </Widget>
}

export default FicTimelineBarChart