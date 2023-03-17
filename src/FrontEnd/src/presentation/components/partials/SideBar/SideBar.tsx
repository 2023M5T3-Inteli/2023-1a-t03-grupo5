import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import './sidebar-styles.scss'
import Logo from '/logo.png'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface Props {
  page: number,
  changePage: Function
}

const SideBar: any = (props: Props) => {
  const [profileOpened, setProfileOpened] = useState(false)
  const [menuOpened, setMenuOpened] = useState(false)

  const user = {
    photo: 'https://www.shutterstock.com/image-vector/male-avatar-profile-picture-vector-600w-149083895.jpg',
    name: 'Pedro',
  }

  useEffect(() => {
    if (menuOpened) {
        document.getElementById('sidebar')!.style.width = '20%'
        document.getElementById('sidebar')!.style.height = '100vh'
    } else {
        document.getElementById('sidebar')!.style.width = '4%'
        document.getElementById('sidebar')!.style.height = '9%'
    }


  }, [menuOpened])


  const menu = [
    {
      name: 'Project',
      link: '/'
    },
    {
      name: 'Profile',
      link: '/profile'
    },
    {
      name: 'Ranking',
      link: '/ranking'
    },
    {
      name: 'Applies',
      link: '/applies'
    },
  ]
  return (
    <div className='sidebar' id="sidebar">
        {
          menuOpened?
          <button className='btnOpenSideBar' onClick={() => setMenuOpened(false)}><div className='btnOpenSideBar'><img style={{"color": "white"}} width={28} src='/less.svg'/></div></button>
          :
          <button className='btnOpenSideBar' onClick={() => setMenuOpened(true)}><div className='btnOpenSideBar'><img style={{"color": "white"}} width={28} src='/more.png'/></div></button>
        }
        {
          menuOpened && 
          <div className='containerSideBar'>
            OI
          </div>
        }
        
    </div>
  )
}

export default SideBar