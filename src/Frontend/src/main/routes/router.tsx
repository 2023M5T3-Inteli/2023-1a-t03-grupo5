import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from '../../presentation/pages/home/home'
// import Login from '../../presentation/pages/login/login'
import CreateProject from '../../presentation/pages/createProject/createProject'
import Login from '../../presentation/pages/login/login'
import VisualizeProject from '../../presentation/pages/visualizeProject/visualizeProject'
import ApplicationForm from '../../presentation/pages/applicationForm/applicationForm'
import VisualizeApplication from '../../presentation/pages/visualizeApplication/visualizeApplication'
import NotFound from '../../presentation/pages/notFound/404'
import SideBar from '../../presentation/components/partials/SideBar/SideBar'
import MyProjects from '../../presentation/pages/myProjects/myProjects'
import Ranking from '../../presentation/pages/ranking/Ranking'

const Router: React.FC = () => {
  const [active, setActive] = useState(-1)
  const [path, setPath] = useState(window.location.href)

  const changePage = (index: number) => {
    setActive(index)
  }

  useEffect(() => {
    setPath(window.location.href)
  }, [changePage, path])

  return (
    <BrowserRouter>
      {
        !path.includes('login' || '404') && <SideBar page={active} changePage={changePage} />
      }
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login changePage={changePage} />}></Route>
        <Route path='/applies' element={<VisualizeApplication />}></Route>
        <Route path='/404' element={<NotFound />}></Route>
        <Route path='/projects' element={<MyProjects />}></Route>
        <Route path='/ranking' element={<Ranking/>}></Route>
        {/* <Route path='/login' element={<Login />}></Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default Router
