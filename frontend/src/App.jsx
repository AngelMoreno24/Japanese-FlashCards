import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        {/* Layout wraps the routes that share the same UI structure */}
        <Route element={<Layout />}>
          {/* "/" renders Home inside the Layout */}
          <Route index element={<Home />} /> 
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
