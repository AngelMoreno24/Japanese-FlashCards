import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';
import HiraganaAlphabet from './pages/HiraganaAlphabet';
import HiraganaWords from './pages/HiraganaWords';
import KatakanaAlphabet from './pages/KatakanaAlphabet';
import KatakanaWords from './pages/KatakanaWords';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        {/* Layout wraps the routes that share the same UI structure */}
        <Route element={<Layout />}>
          {/* "/" renders Home inside the Layout */}
          <Route index element={<Home />} /> 
          <Route path="hiragana" element={<HiraganaAlphabet />} />
          <Route path="hiraganaWords" element={<HiraganaWords />} />
          <Route path="katakana" element={<KatakanaAlphabet />} />
          <Route path="katakanaWords" element={<KatakanaWords />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
