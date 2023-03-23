import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import './sidebar-styles.scss'
import Logo from '/logo.png'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import MenuIcon from '@mui/icons-material/Menu'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'

import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import PersonIcon from '@mui/icons-material/Person'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import LogoutIcon from '@mui/icons-material/Logout'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'

import Modal from '../../modal/modal'
import CreateProject from '../../../pages/createProject/createProject'

interface Props {
  page: number,
  changePage: Function
}

const Sidebar: any = (props: Props) => {
  const [profileOpened, setProfileOpened] = useState(false)
  const [menuOpened, setMenuOpened] = useState(false)
  const [openCreateModal, setOpenCreateModal] = useState(false)

  const closeCreateModal = () => {
    setOpenCreateModal(!openCreateModal)
  }

  const user = {
    photo: 'https://www.shutterstock.com/image-vector/male-avatar-profile-picture-vector-600w-149083895.jpg',
    name: 'Pedro',
  }

  const menu = [
    {
      name: 'Projects',
      link: '/',
      icon: <AutoStoriesIcon />
    },
    {
      name: 'Profile',
      link: '/profile',
      icon: <PersonIcon />
    },
    {
      name: 'Ranking',
      link: '/ranking',
      icon: <EmojiEventsIcon />
    },
    {
      name: 'Applies',
      link: '/applies',
      icon: <HowToRegIcon />
    },
  ]

  return (
    <div className={`sidebar ${menuOpened && 'sidebar-opened'}`}>
      <div className="sidebar-container">
        {
          menuOpened ?
            <button className='burger-button' onClick={() => setMenuOpened(false)}>
              <ArrowBackIosIcon />
            </button>
            :
            <button className='burger-button' onClick={() => setMenuOpened(true)}>
              <ArrowForwardIosIcon />
            </button>
        }
        {
          menuOpened ?
            <div className='sidebar-items'>
              {
                menu.map((item, index) => {
                  return (
                    <Link to={item.link} className={`item ${props.page == index && 'active'}`} key={index} onClick={() => props.changePage(index)}>
                      <p>{item.name}</p>
                      {item.icon}
                    </Link>
                  )
                })
              }
              <div className="item add-button" onClick={() => setOpenCreateModal(true)}>
                <p>New project</p>
                <ControlPointIcon />
              </div>
            </div>
            :
            <div className='sidebar-items'>
              {
                menu.map((item, index) => {
                  return (
                    <Link to={item.link} className={`item ${props.page == index && 'active'}`} key={index} onClick={() => props.changePage(index)}>{item.icon}</Link>
                  )
                })
              }
              <div className="item add-button" onClick={() => setOpenCreateModal(true)}>
                <ControlPointIcon />
              </div>
            </div>
        }

        {/* <div className="profile">
          <div onClick={() => setProfileOpened(!profileOpened)}>
            <div className='select'>
              {
                menuOpened ?
                  <>
                    <img className='logo' src={user.photo} alt="profile photo" />
                    {user.name}
                    <KeyboardArrowDownIcon />
                  </>
                  :
                  <img className='logo' src={user.photo} alt="profile photo" />
              }
            </div>
          </div>

          {
            profileOpened && (
              <div className="options">
                <Link to={'/login'} onClick={() => props.changePage(-1)}>
                  <div>Sair</div>
                </Link>
              </div>
            )
          }
        </div> */}

        <Link to="/login" className="logout" onClick={() => props.changePage(-1)}>
          <PowerSettingsNewIcon />
        </Link>

      </div>

      {
        openCreateModal && <Modal closeArrow={true} closeModal={() => closeCreateModal()} content={<CreateProject closeModal={() => closeCreateModal()} />} />
      }
    </div>
  )
}

export default Sidebar