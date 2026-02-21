import './App.css'

import DailyProjectWordCountForm from './forms/DailyProjectWordCountForm'

function App() {
  return (
    <div className='w-full h-full overflow-y-auto overflow-x-hidden flex flex-col max-w-3xl mx-auto'>
      <h1 className='text-md'>ficsheet</h1>

      <DailyProjectWordCountForm />
    </div>
  )
}

export default App
