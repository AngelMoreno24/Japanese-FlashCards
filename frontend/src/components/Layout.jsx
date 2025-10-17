import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function Layout() {
    const [count, setCount] = useState(0)

    return (
        <div className="bg-gray-800 h-screen text-white">
            <div className='grid grid-cols-5 gap-4 bg-gray-800 h-[100px] border-b-2 border-gray-600'>

                <Link
                    to="/"
                    className='bg-gray-900 rounded-lg m-2 hover:bg-gray-950 text-center content-center'
                >Home
                </Link>
                <Link
                    to="/hiragana"
                    className='bg-gray-900 rounded-lg m-2 hover:bg-gray-950 text-center content-center'
                >hiragana
                </Link>
                <Link
                    to="/hiraganaWords"
                    className='bg-gray-900 rounded-lg m-2 hover:bg-gray-950 text-center content-center'
                >hiragana words
                </Link>
                <Link
                    to="/katakana"
                    className='bg-gray-900 rounded-lg m-2 hover:bg-gray-950 text-center content-center'
                >katakana
                </Link>
                <Link
                    to="/katakanaWords"
                    className='bg-gray-900 rounded-lg m-2 hover:bg-gray-950 text-center content-center'
                >katakana words
                </Link>

            </div>

            <div className='h-2/3 p-10 content-center '>

                <Outlet />

            </div>

        </div>
    )
}

export default Layout;
