import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './components/layout/Mainlayout'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Shop from './components/pages/Shop'
import Blog from './components/pages/Blog'
import Contact from './components/pages/Contact'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route element={<MainLayout/>}>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/shop' element={<Shop/>} />
        <Route path='/blog' element={<Blog/>} />
        </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App