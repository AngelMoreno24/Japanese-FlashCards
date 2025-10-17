import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
  <div className="bg-gray-800 h-screen text-white">
    <div className='grid grid-cols-5 gap-4 bg-gray-800 h-[100px] border-b-2 border-gray-600'>
      
      <button className='bg-gray-800 rounded-lg m-2 hover:bg-gray-900'>b</button>
      <button className='bg-gray-800 rounded-lg m-2 hover:bg-gray-900'>b</button>
      <button className='bg-gray-800 rounded-lg m-2 hover:bg-gray-900'>b</button>
      <button className='bg-gray-800 rounded-lg m-2 hover:bg-gray-900'>b</button>
      <button className='bg-gray-800 rounded-lg m-2 hover:bg-gray-900'>b</button>

    </div>
      <h1 className="text-[50px] font-bold underline h-2/3 p-10">
        Hello world!
      </h1>

    </div>
  )
}

export default App
