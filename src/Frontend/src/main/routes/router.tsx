import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "../../presentation/pages/home/home";
// import Login from '../../presentation/pages/login/login'
import CreateProject from '../../presentation/pages/createProject/createProject'
import Login from '../../presentation/pages/login/login'
import VisualizeProject from '../../presentation/pages/visualizeProject/visualizeProject'
import ApplicationForm from '../../presentation/pages/applicationForm/applicationForm'
import VisualizeApplication from '../../presentation/pages/visualizeApplication/visualizeApplication'
import NotFound from '../../presentation/pages/notFound/404'
import Sidebar from '../../presentation/components/partials/sidebar/sidebar'
import MyProjects from '../../presentation/pages/myProjects/myProjects'
import Ranking from '../../presentation/pages/ranking/ranking'
import Profile from '../../presentation/pages/profile/profile'
import Navbar from '../../presentation/components/partials/navbar/navbar'
import EditProject from '../../presentation/pages/editProject/editProject'
import userService from '../services/userService'
import ApproveProject from '../../presentation/pages/approveProject/approveProject'
import Forgot from '../../presentation/pages/forgotPassword/forgot'
import Registrations from "../../presentation/pages/registrations/registrations";
import 'react-toastify/dist/ReactToastify.css';
import Toast from "../../presentation/components/toast/toast";

const Router: React.FC = () => {
  const [user, setUser] = useState(401);
  const [showSidebar, setShowSidebar] = useState(false);
  const [active, setActive] = useState(-1);
  const [path, setPath] = useState(window.location.href);
  const changePage = (index: number) => {
    setActive(index);
  };
  // useEffect(() => {
  //   if (!path.includes('/login' || '/404' || '/forgotPassword')) {
  //     validateUser()
  //   }
  // }, [])

  const verifyPath = () => {
    if (path.includes("/login") || path.includes("/forgotPassword")) {
      setShowSidebar(false)
    }
    else {
      setShowSidebar(true)
    }
  }

  useEffect(() => {
    setPath(window.location.href);
    verifyPath()
  }, [changePage]);
  // const validateUser = async () => {
  //   const user = await userService.validate();
  //   console.log(user);
  //   if (user === 401) {
  //     window.location.href = "/login";
  //   }
  //   setShowSidebar(true);
  //   console.log(user);
  //   setUser(user);
  // };

  return (
    <BrowserRouter>
      <Toast />
      {showSidebar && <Sidebar page={active} changePage={changePage} />}
      <Routes>
        <Route path='/login' element={<Login changePage={changePage} />}></Route>
        <Route path='/forgotPassword' element={<Forgot />}></Route>
        <Route path='/404' element={<NotFound />}></Route>
        <Route path='/' element={<Home />}></Route>
        <Route path='/applies' element={<VisualizeApplication />}></Route>
        <Route path='/projects' element={<MyProjects user={user} />}></Route>
        <Route path='/ranking' element={<Ranking />}></Route>
        <Route path='/registrations' element={<Registrations />}></Route>
        <Route path='/visualizeProject' element={<VisualizeProject user={user} />}></Route>
        <Route path='/editProject' element={<EditProject closeModal={() => false} />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        {/* <Route path='/login' element={<Login />}></Route> */}
        <Route path='/applicationForm' element={<ApplicationForm closeModal={() => false} />}></Route>
        <Route path='/approveProject' element={<ApproveProject />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;