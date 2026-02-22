import DailyProjectWordCountForm from './forms/DailyProjectWordCountForm'

import Charts from './components/Charts';
import History from './components/History';

function App() {
  return (
    <div className='w-full h-full flex flex-row'>
      <div className='w-1/2 border-r-2 border-zinc-500 border-dashed'>
        <h1 className='py-3'>
          fic<span className='text-secondary'>sheet</span>
        </h1>

        <DailyProjectWordCountForm />
      </div>
      <div className='w-1/2 flex flex-col divide-y-2 divde-zinc-500 divide-dashed'>
        <History className="h-1/2" />
        <Charts className="h-1/2" />
      </div>
    </div>
  )
}

export default App
