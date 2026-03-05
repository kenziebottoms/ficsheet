import Charts from './components/Charts';
import History from './components/History';

function App() {
  return (<>
    <h1 className='p-2 text-center border-b-2 border-dashed border-zinc-500'>
      fic<span className='text-secondary'>sheet</span>
    </h1>
    <div className='w-full h-full flex flex-col lg:flex-row lg:flex-wrap divide-y-2 lg:divide-y-0 lg:divide-x-2 lg divide-zinc-500 divide-dashed'>
      <History />
      <Charts />
    </div>
  </>
  )
}

export default App
