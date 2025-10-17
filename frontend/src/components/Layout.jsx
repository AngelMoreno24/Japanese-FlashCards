import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function Layout() {
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

    <div className='h-2/3 p-10 content-center '>

        <Outlet />

    </div>

    </div>
  )
}

export default Layout;
 