import React from 'react'

const Home = () => { 
  
    return (
  
      <div className=' p-10 content-center grid grid-cols-2 grid-rows-3 gap-7'>
        
        <div className='bg-gray-900  text-center border-1 rounded-lg border-gray-600 w-full h-auto p-10 hover:bg-gray-950 hover:border-gray-700 '>
            
            <h1 className=" text-[30px] font-bold ">
            Hiragana Alphabet
            </h1> 
            <p className=''>practice hiragana characters with flashcards</p>
        </div>

        <div className='bg-gray-900  text-center border-1 rounded-lg border-gray-600 w-full h-auto p-10'>
            
            <h1 className=" text-[30px] font-bold ">
            Hiragana Words
            </h1> 
            <p className=''>practice hiragana words with flashcards</p>
        </div>
        <div className='bg-gray-900  text-center border-1 rounded-lg border-gray-600 w-full h-auto p-10'>
            
            <h1 className=" text-[30px] font-bold ">
            Katakana Alphabet
            </h1> 
            <p className=''>practice hiragana characters with flashcards</p>
        </div>
        <div className='bg-gray-900  text-center border-1 rounded-lg border-gray-600 w-full h-auto p-10 '>
            
            <h1 className=" text-[30px] font-bold ">
            Katakana Words
            </h1> 
            <p className=''>practice hiragana characters with flashcards</p>
        </div>

      </div>
  
  )
}

export default Home
