import DailyProjectWordCountForm from './forms/DailyProjectWordCountForm'
import DataVisualization from './containers/DataVisualization';

function App() {
  return (
    <div className='w-full h-full flex flex-row'>
      <div className='w-1/2 border-r-2 border-zinc-500 border-dashed'>
        <h1 className='py-3'>
          fic<span className='text-secondary'>sheet</span>
        </h1>

        <DailyProjectWordCountForm />
      </div>
      <div className='w-1/2'>
        <DataVisualization />
      </div>
    </div>
  )
}

export default App
