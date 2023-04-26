import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Welcome from './pages/welcome/index'
import Home from './pages/Home'


export default function App() {
  return (
    <div className="main">
        <Routes>
            <Route
                path='/'
                element={<Welcome/>}
            />
            <Route
                path='/feedback'
                element={<Home/>}
            />
        </Routes>
    </div>
  )
}
