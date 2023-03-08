import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '../../presentation/components/partials/navbar/navbar'
import Home from '../../presentation/pages/home/home'
// import Login from '../../presentation/pages/login/login'
import CreateProject from '../../presentation/pages/createProject/createProject'
import Login from '../../presentation/pages/login/login'

const Router: React.FC = () => {
  const [active, setActive] = useState(0)

  const changePage = (index: number) => {
    setActive(index)
  }

  return (
    <BrowserRouter>
      <Navbar page={active} changePage={changePage} />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        {/* <Route path='/login' element={<Login />}></Route> */}
        <Route path='/CreateProject' element={<CreateProject />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
