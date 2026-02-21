import DailyProjectWordCountForm from './forms/DailyProjectWordCountForm'
import History from './components/History'

function App() {
  return (
    <div className='w-full h-full flex flex-row'>
      <div className='grow border-r-2 border-zinc-500 border-dashed'>
        <h1 className='text-md py-3'>
          fic<span className='text-secondary'>sheet</span>
        </h1>

        <DailyProjectWordCountForm />
      </div>
      <div className='grow'>
        <History />
      </div>
    </div>
  )
}

export default App
