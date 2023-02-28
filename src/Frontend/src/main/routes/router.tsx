import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../../presentation/pages/home/home'
import Login from '../../presentation/pages/login/login'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
