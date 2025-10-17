import React from 'react'
import { Link, Outlet } from "react-router-dom";

const Home = () => { 
  
    return (
  
      <div className=' p-10 content-center grid grid-cols-2 grid-rows-3 gap-7'>
        
        <Link
            to="/hiragana"
            className='bg-gray-900  text-center border-1 rounded-lg border-gray-600 w-full h-auto p-10 hover:bg-gray-950 hover:border-gray-700 '
        >            
            <h1 className=" text-[30px] font-bold ">
            Hiragana Alphabet
            </h1> 
            <p className=''>practice hiragana characters with flashcards</p>
        </Link>

        <Link
            to="/hiraganawords"
            className='bg-gray-900  text-center border-1 rounded-lg border-gray-600 w-full h-auto p-10 hover:bg-gray-950 hover:border-gray-700 '
        >            

            <h1 className=" text-[30px] font-bold ">
            Hiragana Words
            </h1> 
            <p className=''>practice hiragana words with flashcards</p>
        </Link>

        <Link
            to="/katakana"
            className='bg-gray-900  text-center border-1 rounded-lg border-gray-600 w-full h-auto p-10 hover:bg-gray-950 hover:border-gray-700 '
        >            

            <h1 className=" text-[30px] font-bold ">
            Katakana Alphabet
            </h1> 
            <p className=''>practice Katakana characters with flashcards</p>
        </Link>
        <Link
            to="/katakanawords"
            className='bg-gray-900  text-center border-1 rounded-lg border-gray-600 w-full h-auto p-10 hover:bg-gray-950 hover:border-gray-700 '
        >            

            <h1 className=" text-[30px] font-bold ">
            Katakana Words
            </h1> 
            <p className=''>practice katakana words with flashcards</p>
        </Link>

      </div>
  
  )
}

export default Home
